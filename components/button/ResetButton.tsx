import { Button, ButtonProps } from '@/components/ui/button'

interface ResetButtonProps extends ButtonProps {}

export function ResetButton({ children = 'リセット', ...props }: ResetButtonProps) {
    return (
        <Button
            {...props}
            className={`rounded border-none bg-gray-600 text-white hover:bg-gray-700 ${props.className || ''}`}
        >
            {children}
        </Button>
    )
}
