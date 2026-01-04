import { Roboto } from 'next/font/google'
import './globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import theme from '@/theme'
import { ThemeProvider } from '@mui/material'
import ResponsiveAppBar from '@/components/ui/app-bar'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ResponsiveAppBar>{children}</ResponsiveAppBar>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
