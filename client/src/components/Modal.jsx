function Modal({success}) {
  return (
    <div>{success ? <div>found</div> : <div>not found</div>}</div>
  )
}
export default Modal