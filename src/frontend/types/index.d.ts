declare interface signInProps {
  username: string;
  password: string;
}

declare type signUpProps = {
  name: string;
  email: string;
  username: string;
  password: string;
}

declare interface customInputProps {
  //control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string
}