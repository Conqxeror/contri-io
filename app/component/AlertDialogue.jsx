import Link from "next/link"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../components/ui/alert-dialog"
  import { Button } from "../../components/ui/button"
  import info from '../../public/info.png'
  import Image from "next/image"
  
  export function AlertDialogDemo() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            Please Read <Image src={info} width={30} height={30}/>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-xl font-bold'>Things to know!</AlertDialogTitle>
            <AlertDialogDescription>
                <li className="mt-1 text-red-400">We are trying to improve ourselves and we need your help.</li>
                <li className="mt-1 text-red-400">Try to make use of small repositories. Big repositories might not work, due to AI limitations.</li>
                <li className="mt-1 text-red-400">You might get "504 Gateway Timeout" error, due to Vercel process limitation.</li>
                <li className="mt-1 text-red-400">We are open for contributions.</li>
                <li className="mt-1 text-red-400">We are open to know more issues that we should focus on.</li>
                <li className="mt-1 text-red-400"><Link href={'https://github.com/Conqxeror/contri-io'} className="text-blue-500 hover:text-blue-800">https://github.com/Conqxeror/contri-io</Link> (Frontend) </li>
                <li className="mt-1 text-red-400"><Link href={'https://github.com/Conqxeror/contri-api'} className="text-blue-500 hover:text-blue-800">https://github.com/Conqxeror/contri-api</Link> (Backend) </li>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok !</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  