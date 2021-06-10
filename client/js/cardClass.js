class Card{
  constructor(_parent,_item){
    this.parent = _parent;
    this.bizName = _item.bizName;
    this.bizPhone = _item.bizPhone;
    this.bizDescription = _item.bizDescription;
    this.bizAddress = _item.bizAddress;
    this._id = _item._id;
  }

  render(){
    let newDiv = $("<div class='col-lg-6 border p-2'></div>");
    $(this.parent).append(newDiv);

    $(newDiv).append(`
    <h2>${this.bizName}</h2>
    <div>Info: ${this.bizDescription}</div>
    <div>Address: ${this.bizAddress}</div>
    <div>Phone: ${this.bizPhone}</div>
    `)
  }
}