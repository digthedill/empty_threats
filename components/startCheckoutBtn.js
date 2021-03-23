const startCheckoutBtn = ({ slug, stripePromise }) => {
  const handleClick = async (e) => {
    e.preventDefault()
    const stripe = await stripePromise

    // create checkout session
    const session = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: slug,
      }),
    }).then((resp) => resp.json())

    await stripe.redirectToCheckout({
      sessionId: session.id,
    })
  }
  return (
    <div>
      <button onClick={handleClick}>Pay</button>
    </div>
  )
}

export default startCheckoutBtn
