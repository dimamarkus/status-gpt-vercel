type TimestampProps = {
  time?: string;
};

const Timestamp = ({ time }: TimestampProps) => {
  return (
    <div className="chat-header">
      <time className="text-xs opacity-50">{time}</time>
    </div>
  );
};

export default Timestamp;
