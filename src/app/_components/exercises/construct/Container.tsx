
type ContainerProps = {
  text: string;
}


export default function Container({ text }: ContainerProps) {

  return (
    <div className="">
      {text}
    </div>
  );
}