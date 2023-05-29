// chacking part
const stepBtn = document.querySelector('.btn-control')
const step1 = document.querySelector('.step1')
const step2 = document.querySelector('.step2')
const step3 = document.querySelector('.step3')
const stepper = document.querySelector('.stepper-container')
const lastStepBtn = document.querySelector('.btn-outline')
let nowStep = 1
// kart-part
const items = document.querySelector('.items-wrapper')
const freightCost = document.querySelector('.freight').children[1]
const totalCost = document.querySelector('.total-price').children[1]

// data-set
const goods = [
  {
    name: '破壞補補釘修身牛仔褲',
    price: 3999,
    img:'',
    amount: 1,

  },
  {
    name: '刷色直筒牛仔褲',
    price: 2999,
    img: '',
    amount: 1
  }
]
let freight = 0

let itemsContent = ``


goods.forEach(good => {
  itemsContent +=
  `
  <div class="item">
    <img src="" alt="">
    <div class="item-text">
      <div class="item-name">${good.name}</div>
      <div class="amount-wrapper">
        <button class="minus">-</button>
        <p class="amount">1</p>
        <button class="plus">+</button>
      </div>
      <div class="item-price">$${good.price}</div>
    </div>
  </div>
  `
})
items.innerHTML = itemsContent

function nextStep() {
  if (nowStep === 1 ) {
    nowStep += 1
    step1.classList.toggle('d-none')
    step2.classList.toggle('d-none')

    stepper.children[1].classList.toggle('active')
    lastStepBtn.removeAttribute('disabled')
    return
  }

  if (nowStep === 2) {
    nowStep += 1
    step2.classList.toggle('d-none')
    step3.classList.toggle('d-none')

    stepper.children[2].classList.toggle('active')
    stepBtn.children[1].innerText = '送出訂單'
    return
  }
}

function lastStep () {
  if (nowStep === 2) {
    nowStep -= 1
    step2.classList.toggle('d-none')
    step1.classList.toggle('d-none')

    stepper.children[1].classList.toggle('active')
    lastStepBtn.setAttribute('disabled', '')
  }

  if (nowStep === 3) {
    nowStep -= 1
    step3.classList.toggle('d-none')
    step2.classList.toggle('d-none')

    stepper.children[2].classList.toggle('active')
    stepBtn.children[1].innerText = '下一步'
  }
}



step2.addEventListener('click', function freightControl (e) {
  if (e.target.matches('.standard-dilivery')) {
    freight = 0
    freightCost.innerText = `$${freight.toString()}`
  } else if (e.target.matches('.DHL-dilivery')) {
    freight = 500
    freightCost.innerText = `$${freight.toString()}`
  }
  const total = (goods[0].price * goods[0].amount) + (goods[1].price * goods[1].amount) + freight
  totalCost.innerText = `$${total.toString()} `
})


stepBtn.addEventListener('click', function stepControl(e) {

  if (e.target.matches('.btn-primary')) {
    nextStep()
  }
  
  if (e.target.matches('.btn-outline')) {
    lastStep()
  }
})

items.addEventListener('click', function amountControl(e) {
  const good = goods.find(good => good.name === e.target.parentElement.parentElement.children[0].innerText)
  let amount = e.target.parentElement.children[1]
  let itemPrice = e.target.parentElement.parentElement.children[2]
  if (e.target.matches('.plus')) {
    good.amount += 1
    amount.innerText = good.amount.toString()
    itemPrice.innerText = `$${(good.price * good.amount).toString()}`
  }

  if (e.target.matches('.minus')) {
    if(good.amount === 0) { return }
    good.amount -= 1
    amount.innerText = good.amount.toString()
    itemPrice.innerText = `$${(good.price * good.amount).toString()}`
  } 
  const total = (goods[0].price * goods[0].amount) + (goods[1].price * goods[1].amount) + freight
  totalCost.innerText = `$${total.toString()} `
})
  
