import { Header } from './components/header'
import { OrderProvider } from '@/providers/order'

export default function DashboardLayout({ children }: 
  { children: React.ReactNode}
){
  return(
    <>
      <Header/>
      <OrderProvider>
        {children}
      </OrderProvider>
    </>
  )
}

//Em volta da página estamos utilizando o contexto OrderProvider (content api)
//Children é onde está renderizando a página
