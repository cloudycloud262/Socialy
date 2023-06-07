import { useRef, FC, ChangeEvent } from "react";

type TextAreaProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  maxLength: number;
};

const Textarea: FC<TextAreaProps> = (props) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(e.target.value);
    e.target.style.height = "auto";
    if (e.target.scrollHeight > e.target.clientHeight) {
      e.target.style.height = `${e.target.scrollHeight - 4}px`;
    }
  };

  return (
    <textarea
      value={props.value}
      onChange={changeHandler}
      rows={1}
      placeholder={props.placeholder}
      ref={ref}
      maxLength={props.maxLength}
    />
  );
};

export default Textarea;
