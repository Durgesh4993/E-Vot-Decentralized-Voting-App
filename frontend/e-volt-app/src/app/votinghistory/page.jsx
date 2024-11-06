import React from 'react'

export default function VotingHistory() {
  return (
    <div className="py-10 px-20">
        <div>
            <p className="text-[32px] font-medium form-item">Hello, Samuel</p>
            <p className=" form-item">View recent voting history</p>
        </div>
        <div className="flex justify-between items-center border-b-2 pt-10 pb-4 gap-14 mt-6 mb-10 form-item">
            <p className='font-medium text-[22px]'>
                Voting History
            </p>
            {/* <p>
                View All
            </p> */}
        </div>
        <table className="min-w-full border-collapse form-item">
            <thead>
                <tr className="border-b form-item">
                    <th className="text-left py-4">Tx Hash</th>
                    <th className="text-left py-4">Election/Post</th>
                    <th className="text-left py-4">Participant</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b hover:bg-gray-100 cursor-pointer form-item">
                    <td className="py-4">0xe8dcb84bf1659607254f990882ed2c44d9825501bee2ab4e48b06ff116a66388</td>
                    <td className="py-4">Unilag SUG / President</td>
                    <td className="py-4">Samuel Ajayi Crowther</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 cursor-pointer form-item">
                    <td className="py-4">0xe8dcb84bf1659607254f990882ed2c44d9825501bee2ab4e48b06ff116a66388</td>
                    <td className="py-4">Unilag SUG / President</td>
                    <td className="py-4">Samuel Ajayi Crowther</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 cursor-pointer form-item">
                    <td className="py-4">0xe8dcb84bf1659607254f990882ed2c44d9825501bee2ab4e48b06ff116a66388</td>
                    <td className="py-4">Unilag SUG / President</td>
                    <td className="py-4">Samuel Ajayi Crowther</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
