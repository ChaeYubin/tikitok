import Link from 'next/link'

import BackButton from '@/shared/components/back-button'
import { Button } from '@/shared/ui/button'

const NotFound = () => {
  return (
    <div className="flex flex-1 items-center justify-center overflow-hidden p-5">
      <div className="relative z-10 max-w-2xl text-center">
        <div className="mb-5 text-7xl drop-shadow-2xl md:text-8xl">404</div>

        <h1 className="animate-fade-in mb-4 text-2xl font-semibold md:text-3xl">
          페이지를 찾을 수 없습니다
        </h1>

        <p className="animate-fade-in-delay mb-10 text-lg leading-relaxed opacity-90 md:text-xl">
          요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
          <br />
          입력하신 주소가 정확한지 다시 한번 확인해주세요.
        </p>

        <div className="animate-fade-in-delay-2 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/time-board">타임 보드로 돌아가기</Link>
          </Button>
          <BackButton size="lg" variant="outline" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
