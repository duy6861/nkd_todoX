import React from 'react'

const Footer = ({completedTaskCount=2, activeTaskCount=3}) => {
  return (
    <>
    {
      completedTaskCount + activeTaskCount > 0 && (
        <div className='text-center'>
          <p className='text-sm text-muted-foreground'>
            {
              completedTaskCount>0 && (
                <>
                🎉 Yay! Bạn Đã hoàn thành {completedTaskCount} công viêc
                {
                  activeTaskCount > 0 && `, chỉ còn ${activeTaskCount} nữa thôi, cố lên nhé 🤗`
                }
                </>
              )
            }
            {
              completedTaskCount === 0 && activeTaskCount && (
              <>Hãy bắt đầu làm {activeTaskCount} nhiệm vụ nào!</>
            )
            }
          </p>
        </div>
      )
    }
    </>
  )
}
export default Footer
