import {required, maxLength, minLength, email, numeric, NumericValueType, prop} from "@rxweb/reactive-form-validators";
import {Constants} from "../utils/constants";

export class Supplier {

}


export class FormSupplier {
  @prop()
  categoryList: any[]

  @prop()
  ruc: string

  @prop()
  businessName: string

  @required()
  @email()
  @maxLength({value: 50, message: Constants.maxLength + 50})
  email: string

  @required()
  @minLength({value: 3, message: Constants.minLength + 3})
  @maxLength({value: 200, message: Constants.maxLength + 200})
  representative: string

  @required()
  @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: false})
  @minLength({value: 6, message: Constants.minLength + 6})
  @maxLength({value: 9, message: Constants.maxLength + 9})
  phone: number

  @required()
  @numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: false})
  @minLength({value: 9, message: Constants.minLength + 9})
  @maxLength({value: 9, message: Constants.maxLength + 9})
  cellphone: number

}
