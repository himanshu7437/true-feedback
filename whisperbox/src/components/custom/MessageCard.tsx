import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '../ui/card'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Message } from '@/model/User.model'

type MessageCardProps = {
  message: Message,
  onMessageDelete: (messageId: string) => void
}
const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {

  const handleDeleteConfirm = () => {
    
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline"><X className='w-5 h-5'/></Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  )
}

export default MessageCard