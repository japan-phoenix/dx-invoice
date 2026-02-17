'use client'

import { useState, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { searchPostalCode } from '@/lib/address'
import { toast } from '@/hooks/use-toast'

interface PostalCodeSearchDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onAddressSelect: (fullAddress: string) => void
}

const normalizeFullWidthToHalfWidth = (value: string): string => {
    return value.replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
}

export function PostalCodeSearchDialog({ open, onOpenChange, onAddressSelect }: PostalCodeSearchDialogProps) {
    const [postalCode, setPostalCode] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = useCallback(async () => {
        if (!postalCode) {
            toast({
                title: '郵便番号を入力してください',
                variant: 'destructive',
                duration: 2000,
            })
            return
        }

        const normalized = normalizeFullWidthToHalfWidth(postalCode)
        if (normalized.replace(/[^0-9]/g, '').length !== 7) {
            toast({
                title: '郵便番号は7桁である必要があります',
                variant: 'destructive',
                duration: 2000,
            })
            return
        }

        setIsSearching(true)
        try {
            const result = await searchPostalCode(normalized)
            if (!result) {
                toast({
                    title: '該当する住所が見つかりません',
                    variant: 'destructive',
                    duration: 2000,
                })
                return
            }

            // 住所をセット
            if (result.fullAddress) {
                onAddressSelect(result.fullAddress)
                toast({
                    title: '住所を検索しました',
                    variant: 'success',
                    duration: 2000,
                })
                // ダイアログを閉じる
                onOpenChange(false)
                setPostalCode('')
            }
        } catch (error: any) {
            console.error('郵便番号検索エラー:', error)
            const errorMessage = error?.response?.data?.error || error?.message || '住所検索に失敗しました'
            toast({
                title: errorMessage,
                variant: 'destructive',
                duration: 3000,
            })
        } finally {
            setIsSearching(false)
        }
    }, [postalCode, onAddressSelect, onOpenChange])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSearch()
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>郵便番号から住所検索</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">郵便番号</label>
                        <Input
                            type="text"
                            placeholder="例: 100-0001"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            キャンセル
                        </Button>
                        <Button type="button" onClick={handleSearch} disabled={isSearching}>
                            {isSearching ? '検索中...' : '検索'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
