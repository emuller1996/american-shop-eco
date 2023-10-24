import { Form } from "react-bootstrap";
import "./InputText.css";

export default function InputText({
  name,
  rules,
  error,
  register,
  label,
  placeholder,
}) {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label className="label-ame">{label}</Form.Label>
      <Form.Control
        {...register(name, rules)}
        type="text"
        placeholder={placeholder}
      />
      {error?.[name]?.message && (
        <Form.Text className="ms-3 text-muted-error">
          {error?.[name]?.message}
        </Form.Text>
      )}
    </Form.Group>
  );
}
