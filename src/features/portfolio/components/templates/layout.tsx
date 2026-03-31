import '@/features/portfolio/styles/index.css';
import React, { ReactNode } from 'react'
import { Footer, Header } from '@/features/portfolio/components/organisms';
import dynamic from 'next/dynamic';
import { ScrollProgress, WidgetGroup } from '@/common/components/';
const Background3D = dynamic(
    () => import('@/features/portfolio/components/organisms/background-3d').then((m) => m.Background3D),
    { ssr: false },
);
export const PortfolioLayout = ({ children }: { children: ReactNode }) => {
    return (
        <React.Fragment>
            <Background3D />
            <div className="relative z-10">
                <ScrollProgress />
                <Header />
                {children}
                <Footer />
                <WidgetGroup />
            </div>
        </React.Fragment>
    )
}
