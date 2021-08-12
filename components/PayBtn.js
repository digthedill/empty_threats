import ReactLoading from 'react-loading'

const PayBtn = ({
  slug,
  stripePromise,
  available,
  purchasing,
  setPurchasing
}) => {
  const handleClick = async (e) => {
    e.preventDefault()
    setPurchasing(true)
    const stripe = await stripePromise

    // create checkout session
    const session = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slugs: [slug]
      })
    }).then((res) => res.json())

    console.log(session)
    return stripe.redirectToCheckout({
      sessionId: session.id
    })
  }
  const payBtn = (
    <button
      onClick={handleClick}
      className="bg-yellow-500 text-black px-2 py-1 hover:bg-blue-500 hover:text-white"
      disabled={!available}
    >
      Buy
    </button>
  )

  const soldOutBtn = (
    <button
      // onClick={handleClick}
      className="bg-yellow-500 text-black px-2 py-1 opacity-50 cursor-not-allowed"
      disabled={!available}
    >
      Sold Out
    </button>
  )
  if (purchasing) {
    return <ReactLoading type="bubbles" height="35px" width="35px" />
  }
  return <>{available ? payBtn : soldOutBtn}</>
}

export default PayBtn
