import { Button, ButtonProps } from '@/components/ui/button'

interface SearchButtonProps extends ButtonProps {
    isLoading?: boolean
}

export function SearchButton({ isLoading = false, children = '検　索', ...props }: SearchButtonProps) {
    return (
        <Button
            type="button"
            {...props}
            disabled={isLoading || props.disabled}
            className={`rounded text-xl py-6 border-none bg-blue-600 text-white hover:bg-blue-700 ${props.className || ''}`}
        >
            {children}
        </Button>
    )
}
