import Image from 'next/image'
import type { CompanyProfile } from '@/lib/company'

type Props = {
    company: CompanyProfile
}

export function PdfCompanyProfile({ company }: Props) {
    return (
        <div className="flex items-center justify-end gap-2 border-0 border-black px-2 py-1 text-left">
            <div className="relative h-[52px] w-[48px] overflow-hidden border-0">
                <Image src="/images/pdf_company_logo.png" alt="玉泉院" fill className="object-contain" sizes="256px" />
            </div>
            <div className="flex flex-col items-center justify-center gap-0 border-0 border-black text-left leading-[0.8]">
                <p className="text-sm leading-[1]">
                    <strong>{company.companyName}</strong>
                </p>
                <div className="flex items-center gap-2">
                    <p className="text-xs leading-[1.2]">
                        総合
                        <br />
                        葬祭
                    </p>
                    <p className="text-xl">沖縄</p>
                    <p className="mb-1 text-3xl">玉泉院</p>
                </div>
                <p className="self-start text-sm">{company.companyAddress}</p>
                <p className="self-start text-sm">TEL: {company.companyTel}</p>
                {company.companyNo && (
                    <p className="self-start text-sm ">
                        <strong>登録番号: {company.companyNo}</strong>
                    </p>
                )}
            </div>
        </div>
    )
}
