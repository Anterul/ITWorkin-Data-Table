import "./Customer.scss";

function Customer(props: any) {
  const emptyText: string = "";

  return (
    <div className="customer">
      <label className="customer__custom-checkbox">
        <input type="checkbox" />
        <span className="customer__checkmark">{emptyText}</span>
      </label>
      <p className="customer__order-number">{props.customer.id}</p>
      <h2 className="customer__name">{props.customer.name}</h2>
      <p className="customer__personal-number">5543466336</p>
      <p className="customer__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...
      </p>
      <p className="customer__status">Open</p>
      <p className="customer__rate">
        $70.00<span>CAD</span>
      </p>
      <p className="customer__balance">
        -$270.00<span>CAD</span>
      </p>
      <p className="customer__deposit">
        $500.00<span>CAD</span>
      </p>
    </div>
  );
}

export default Customer;
