import { Button, ButtonProps } from '@/components/ui/button'

interface CreateButtonProps extends ButtonProps {}

export function CreateButton({ children = '新規作成', ...props }: CreateButtonProps) {
    return (
        <Button
            {...props}
            className={`rounded border-none bg-green-600 text-white hover:bg-green-700 ${props.className || ''}`}
        >
            {children}
        </Button>
    )
}
