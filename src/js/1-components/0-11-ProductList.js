import React from 'react'
import { WrapLink } from '@components'
import { imgUrl, clipBigNum } from '@utils'

// const v = [
//   {
//     id: 2,
//     isHot: 0, // 是否热门推荐 1 / 0
//     name: '贷款产品标题',
//     interest_rate_method: 1, // 1 日费率  2 月费率
//     interest_rate: '0.34%',
//     apply_material_name: ['芝麻分', '信用卡', '学生证', '身份证'],
//     sum_start: 10000,
//     sum_end: 50000,
//     description: '信用卡极速贷，最快30分钟放款',
//     thumb: 'http://placekitten.com/g/300/300', // 传图尺寸建议 300*300
//     isLoan: 1,
//     apply_num: 12345, // 申请人数，没有则为 0 或者 null
//   },

//   {
//     id: 2,
//     isHot: 1, // 是否热门推荐 1 / 0
//     name: '信用卡产品标题',
//     apply_material_name: ['芝麻分', '信用卡', '学生证', '身份证'],
//     description: '开卡首年免年费，五折美食优惠，尊享双倍积分',
//     thumb: 'http://placekitten.com/g/300/300', // 传图尺寸建议 300*300
//     outmoney_limit: '30%', // 提现额度
//     free_of_interest_period: '55天', // 免息期
//     apply_num: 12345, // 申请人数，没有则为 0 或者 null
//   },
// ]

export default data => (
  <WrapLink
    className={`plr25 pt25 bg-white block relative ${data.border ? 'border-bottom' : ''}`}
    path={`/${data.isLoan ? 'loan' : 'card'}/${data.id}`}
  >
    {data.isHot && data.openHot ? <div className="home-product-list-hot bg-second c-white font24 w66 h36">热门</div> : null}
    <div className="flex">
      <div className="equal flex overflow-h">
        <div
          style={{ width: data.isLoan ? '1.3rem' : '1.5rem', height: data.isLoan ? '1.3rem' : '0.94rem' }}
          className="log-bg r4 mr20 equal-no overflow-h"
        >
          <img
            src={imgUrl(data.thumb)}
            className="h-100"
            alt=""
          />
        </div>
        <div className="overflow-h flex column jc-between">
          <div className={`c333 text-overflow-one lh100 bold ${data.isLoan ? 'font28' : 'font30'}`}>
            {data.name}
          </div>
          {
            data.isLoan ?
              <div>
                <span className="font24 c666 lh100 mr20">
                  {data.interest_rate_method}费率：<span className="c-second">{data.interest_rate}%</span>
                </span>
              </div> :
              <div>
                {
                  data.cash_withdrawal_ratio &&
                  <span className="font24 c666 lh100 mr20">提现：<span className="c-second">{data.cash_withdrawal_ratio}%</span></span>
                }
                {
                  data.free_of_interest_period_end &&
                  <span className="font24 c666 lh100">免息：<span className="c-second">{data.free_of_interest_period_end}天</span></span>
                }
              </div>
          }
          {
            data.isLoan && data.apply_material_name && data.apply_material_name.length > 0 &&
              <div className="flex overflow-h home-product-list-hide">
                {
                  data.apply_material_name.map((item, index) => (
                    <span
                      key={uuid.v4()}
                      className={`home-product-list-tip equal-no r2 font20 c-main plr10 ${index !== data.apply_material_name.length - 1 ? 'mr12' : ''}`}
                    >
                      {item}
                    </span>
                  ))
                }
              </div>
          }
        </div>
      </div>
      <div className={`flex column ${data.isHot && data.openHot ? 'jc-end' : 'jc-between'} pl20`}>
        <div className="font24 c666 text-right">{data.apply_num}人申请</div>
        { data.isLoan && <div className="font28 c-second text-right mt20">{clipBigNum(data.sum_start)}-{clipBigNum(data.sum_end)}</div> }
      </div>
    </div>
    <div className="font20 c999 pt15 pb20">{data.description}</div>
  </WrapLink>
)
