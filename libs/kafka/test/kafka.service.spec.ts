import { KafkaService } from "../src/kafka.service";
import { ClientKafka } from "@nestjs/microservices";

describe("KafkaService", () => {
  let mockClient: jest.Mocked<ClientKafka>;
  let service: KafkaService;

  beforeEach(() => {
    mockClient = {
      connect: jest.fn().mockResolvedValue(undefined),
      emit: jest.fn(),
    } as unknown as jest.Mocked<ClientKafka>;

    service = new KafkaService(mockClient);
  });

  it("should connect the kafka client on module init", async () => {
    await service.onModuleInit();

    expect(mockClient.connect).toHaveBeenCalled();
  });

  it("should emit message with key null when id is not present", async () => {
    const topic = "test-topic";
    const message = { foo: "bar" };

    await service.sendMessage(topic, message);

    expect(mockClient.emit).toHaveBeenCalledWith(topic, {
      key: null,
      value: JSON.stringify(message),
    });
  });

  it("should emit message with key set when id is present", async () => {
    const topic = "test-topic";
    const message = { id: "123", foo: "bar" };

    await service.sendMessage(topic, message);

    expect(mockClient.emit).toHaveBeenCalledWith(topic, {
      key: "123",
      value: JSON.stringify(message),
    });
  });
});
