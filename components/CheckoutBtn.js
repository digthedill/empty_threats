const CheckoutBtn = ({ cart, stripePromise }) => {
  const handleClick = async (e) => {
    e.preventDefault()
    const stripe = await stripePromise

    // create checkout session
    const session = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slugs: cart.map((item) => item.slug)
      })
    }).then((res) => res.json())

    console.log(session)
    return stripe.redirectToCheckout({
      sessionId: session.id
    })
  }

  return (
    <button
      onClick={handleClick}
      className="bg-yellow-500 text-black px-2 py-1 hover:bg-blue-500 hover:text-white"
    >
      Checkout
    </button>
  )
}

export default CheckoutBtn
