"use client"
//Usamos o use client para conseguir manipular os dados do client-side se fosse server-side não poderíamos usar o useState, ChangeEvent e onChange.

import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/app/dashboard/components/button'

export function Form(){
  const [image, setImage] = useState<File>()
  const [previewImage, setPreviewImage] = useState("")

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

      <form className={styles.form}>

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
          <option key={1} value={1}>
            Pizzas
          </option>

          <option key={1} value={1}>
            Massas
          </option>
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