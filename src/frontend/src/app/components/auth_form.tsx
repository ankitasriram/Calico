import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { authFormSchema } from '../../../lib/utils'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CustomInput from './custom_input'

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter()
    const [user, setUser] = useState(null);

    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    return (
        <section className='authform'>
            {type === 'sign-up' && (
                <div>
                    <CustomInput
                        name='name'
                        label='Name'
                        placeholder='Jane Doe'
                    />
                    <CustomInput
                        name='email'
                        label='Email'
                        placeholder='example@gmail.com'
                    />
                </div>
            )}
            <CustomInput 
                name='username'
                label='Username'
                placeholder='uniqueUsername'
            />
            <CustomInput 
                name='password'
                label='Password'
                placeholder=''
            />

            <button type='submit'>
                {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </button>
        </section>
    )
}
export default AuthForm