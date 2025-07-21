import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '../../../lib/utils'

const formSchema = authFormSchema('sign-up')

const CustomInput = ({ name, label, placeholder }: customInputProps) => {
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