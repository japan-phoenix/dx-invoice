import { Button, ButtonProps } from '@/components/ui/button'

interface SearchButtonProps extends ButtonProps {
    isLoading?: boolean
}

export function SearchButton({ isLoading = false, children = '検索', ...props }: SearchButtonProps) {
    return (
        <Button
            {...props}
            disabled={isLoading || props.disabled}
            className={`rounded border-none bg-blue-600 text-white hover:bg-blue-700 ${props.className || ''}`}
        >
            {children}
        </Button>
    )
}
