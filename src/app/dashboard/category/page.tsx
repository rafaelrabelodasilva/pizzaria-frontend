import { Button } from '../components/button'
import styles from './styles.module.scss'

export default function Category(){

  async function handleRegisterCategory() {
    //Adicionado a tag abaixo para ser executado server-side e não client-side
    "use server"

    console.log('TESTE');
    
  }

  return (
    <main className={styles.container}>
      <h1>Nova categoria</h1>

      <form 
        className={styles.form}
        action={handleRegisterCategory}
      >
        <input 
          type="text" 
          name="name"
          placeholder='Nome da categoria, ex.: Pizzas'
          required
          className={styles.input}
        />
        <Button name='Cadastrar'/>
      </form>
    </main>
  )
}