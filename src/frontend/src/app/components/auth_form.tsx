import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { authFormSchema } from '../../../lib/utils'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CustomInput from './custom_input'
import { signIn, signUp } from '../../../lib/user_actions'

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter()
    const [user, setUser] = useState(null);

    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            if (type === 'sign-up') {
                const userData = {
                    name: data.name!,
                    email: data.email!,
                    username: data.username!,
                    password: data.password,
                }
                const newUser = await signUp(userData)

                //setUser(newUser)
            }

            if (type === 'sign-in') {
                const res = await signIn({
                    username: data.username,
                    password: data.password,
                })

                if (res) {
                    router.push('/')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

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