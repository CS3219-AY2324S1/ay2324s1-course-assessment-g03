interface SystemMessageProps {
  message: string;
}

export const SystemMessage = ({ message }: SystemMessageProps): JSX.Element => (
  <div>
    <div>{message}</div>
  </div>
);
