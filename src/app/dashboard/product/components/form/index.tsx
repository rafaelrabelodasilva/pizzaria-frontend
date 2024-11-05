"use client"
//Usamos o use client para conseguir manipular os dados do client-side se fosse server-side não poderíamos usar o useState, ChangeEvent e onChange.

import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/app/dashboard/components/button'
import { getCookieClient } from '@/lib/cookieClient'
import { api } from '@/services/app'

interface CategoryProps{
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[]
}

export function Form({ categories }: Props){
  const [image, setImage] = useState<File>()
  const [previewImage, setPreviewImage] = useState("")

  async function handleRegisterProduct(formData: FormData){
    const categoryIndex = formData.get('category')
    const name = formData.get('name')
    const price = formData.get('price')
    const description = formData.get('description')

    if(!name || !categoryIndex || !price || !description || !image){
      return
    }

    const data = new FormData()

    data.append('name', name)
    data.append('price', price)
    data.append('description', description)
    data.append('category_id', categories[Number(categoryIndex)].id)
    data.append('file', image)

    const token = getCookieClient()

    await api.post('/product', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch((error) => {
      console.log(error)
      return
    })

    console.log('Cadastro efetuado com sucesso!');
    
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      const image = e.target.files[0];

      if(image.type !== "image/jpeg" && image.type !== "image/png"){
        console.log("FORMATO PROIBIDO!!!")
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image))

    }
  }


  return(
    <main className={styles.container}>
      <h1>Novo produto</h1>

      <form 
        className={styles.form}
        action={handleRegisterProduct}
      >

        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#FFF" />
          </span>

          <input 
            type="file" 
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />


          {previewImage && (
            <Image
              alt="Imagem de preview"
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="category">
          {categories.map( (category, index) => (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          ))}
        </select>

          <input 
            type="text"
            name='name'
            placeholder='Informe o nome do produto'
            required
            className={styles.input}
          />

          <input 
            type="text"
            name='price'
            placeholder='Informe o preço do produto'
            required
            className={styles.input}
          />

          <textarea
            className={styles.input}
            placeholder='Informe a descrição do produto'
            required
            name='description'
          ></textarea>

          <Button name='Cadastrar produto'/>
      </form>
    </main>
  )
}