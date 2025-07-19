import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '../../../lib/utils'

const formSchema = authFormSchema('sign-up')

interface CustomInput {
  //control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string
}

const CustomInput = ({ name, label, placeholder }: CustomInput) => {
  return (
    <label>
        {label}
        <input 
            type='text'
            value={name}
            placeholder={placeholder}
        />
    </label>
  )
}

export default CustomInput