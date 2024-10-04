import Heading from '@/components/global/Heading'

export default function Page() {
  return (
    <div className="container mx-auto h-full">
      <Heading>Settings</Heading>

      <div className="bg-gray grid grid-cols-5 rounded-lg p-4">
        <div className="col-span-1 border-r">side</div>
        <div className="col-span-4 px-8">settings</div>
      </div>
    </div>
  )
}
