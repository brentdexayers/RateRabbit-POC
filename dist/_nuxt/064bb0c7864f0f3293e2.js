(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{295:function(t,e,o){var content=o(318);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(15).default)("610af54a",content,!0,{sourceMap:!1})},296:function(t,e,o){var content=o(320);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(15).default)("4bebd6f4",content,!0,{sourceMap:!1})},317:function(t,e,o){"use strict";var n=o(295);o.n(n).a},318:function(t,e,o){(e=o(14)(!1)).push([t.i,".form--apply__header{color:#009646;font-size:21px;font-weight:700;line-height:32px}@media (max-width:767.98px){.form--apply__submit{font-size:1.87031rem;margin-top:1.625rem;padding-bottom:.6875rem;padding-top:.6875rem;width:100%}}.form--apply__footer{color:#888a8c;font-size:.75rem;font-style:italic;line-height:1.333333333333333}@media (max-width:767.98px){.form--apply__footer{padding:0 2rem;text-align:center}}",""]),t.exports=e},319:function(t,e,o){"use strict";var n=o(296);o.n(n).a},320:function(t,e,o){(e=o(14)(!1)).push([t.i,".page--apply{margin:0 auto;padding-bottom:10rem}.page--apply__table{margin-bottom:5rem}.page--apply__table td+td{text-align:right}.page--apply .form--apply--submit{margin-top:35px}.page--apply .form--apply input,.page--apply .form--apply select{height:3.375rem;padding-top:1rem;transition:all .2s ease-in-out}.page--apply .form--apply label:not(.custom-control-label){color:#888a8c;font-size:1rem;margin-bottom:0;margin-left:calc(1rem + 1px);pointer-events:none;position:absolute;top:1em;transition:all .2s ease-in-out}.page--apply .form--apply label img{pointer-events:auto}.page--apply .form--apply label.focused,.page--apply .form--apply label.hasvalue{color:#009646;font-size:.8125rem;top:.25em}.page--apply .form--apply label.focused+input,.page--apply .form--apply label.focused+select,.page--apply .form--apply label.hasvalue+input,.page--apply .form--apply label.hasvalue+select{padding-top:1rem}.page--apply .form--apply label.custom-control-label{color:#2d3033;margin-left:0;pointer-events:inherit;position:relative}",""]),t.exports=e},358:function(t,e,o){"use strict";o.r(e);o(27);var n=o(9),r=o(37),l={data:function(){return{formHasErrors:!1}},computed:{firstname:{get:function(){return this.$store.state.application.firstname},set:function(t){this.$store.commit("application/setfirstname",t)}},lastname:{get:function(){return this.$store.state.application.lastname},set:function(t){this.$store.commit("application/setlastname",t)}},phone:{get:function(){return this.$store.state.application.phone},set:function(t){this.$store.commit("application/setphone",t)}},email:{get:function(){return this.$store.state.application.email},set:function(t){this.$store.commit("application/setemail",t)}}},asyncData:function(t){t.params;console.log(Object(r.b)())},methods:{focusClassAdd:function(t){t.target.previousElementSibling.classList.add("focused")},focusClassRemove:function(t){t.target.previousElementSibling.classList.remove("focused")},formValidate:function(){this.formHasErrors=!1,this.firstname||(this.formHasErrors=!0),this.lastname||(this.formHasErrors=!0),this.phone||(this.formHasErrors=!0),this.email||(this.formHasErrors=!0),this.formHasErrors||this.$store.commit("application/setcompleted",!0),window.scrollTo(0,0)}}},c=(o(317),o(11)),m={layout:"default",components:{Form:Object(c.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("form",{staticClass:"form form--apply",attrs:{id:"application-form",action:"/apply",method:"POST"},on:{submit:function(e){return e.preventDefault(),t.formValidate(e)}}},[o("h3",{staticClass:"form--apply__header"},[t._v("\n      Start the loan application process\n    ")]),t._v(" "),t.formHasErrors?o("p",{staticClass:"text-danger"},[t._v("\n      Please complete the application form.\n    ")]):t._e(),t._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"form-group col-12 col-lg-6"},[o("label",{class:{hasvalue:t.firstname},attrs:{for:"firstname"}},[t._v("\n          "+t._s(t._f("titlecase")("First Name"))+"\n        ")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.firstname,expression:"firstname"}],staticClass:"form-control",attrs:{type:"text",name:"firstname"},domProps:{value:t.firstname},on:{focus:function(e){return t.focusClassAdd(e)},blur:function(e){return t.focusClassRemove(e)},input:function(e){e.target.composing||(t.firstname=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group col-12 col-lg-6"},[o("label",{class:{hasvalue:t.lastname},attrs:{for:"lastname"}},[t._v("\n          "+t._s(t._f("titlecase")("Last Name"))+"\n        ")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.lastname,expression:"lastname"}],staticClass:"form-control",attrs:{type:"text",name:"lastname"},domProps:{value:t.lastname},on:{focus:function(e){return t.focusClassAdd(e)},blur:function(e){return t.focusClassRemove(e)},input:function(e){e.target.composing||(t.lastname=e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"form-group col-12 col-lg-6"},[o("label",{class:{hasvalue:t.phone},attrs:{for:"phone"}},[t._v("\n          "+t._s(t._f("titlecase")("Phone Number"))+"\n        ")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],staticClass:"form-control",attrs:{type:"text",name:"phone"},domProps:{value:t.phone},on:{focus:function(e){return t.focusClassAdd(e)},blur:function(e){return t.focusClassRemove(e)},input:function(e){e.target.composing||(t.phone=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group col-12 col-lg-6"},[o("label",{class:{hasvalue:t.email},attrs:{for:"email"}},[t._v("\n          "+t._s(t._f("titlecase")("Email Address"))+"\n        ")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"text",name:"email"},domProps:{value:t.email},on:{focus:function(e){return t.focusClassAdd(e)},blur:function(e){return t.focusClassRemove(e)},input:function(e){e.target.composing||(t.email=e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"form-group col-12"},[o("button",{staticClass:"btn btn-primary form--apply__submit mt-4",attrs:{type:"submit",name:"submit"}},[t._v("\n          "+t._s(t._f("titlecase")("Submit"))+"\n        ")])])]),t._v(" "),t._m(0)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 col-md-5"},[e("p",{staticClass:"form--apply__footer"},[this._v("\n          Your information is private, and will be submitted over secure connections.\n        ")])])])}],!1,null,null,null).exports},data:function(){return{title:"Apply For a Loan"}},computed:{application:function(){return this.$store.state.application},loanProduct:function(){return this.$store.state.application.loanProduct},applicationCompleted:{get:function(){return this.$store.state.application.completed},set:function(t){this.$store.commit("application/setcompletedStatus",t)}}},fetch:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.store,t.params,e.next=3,o.dispatch("AUTHENTICATE");case 3:case"end":return e.stop()}}),e)})))()},methods:{toggleApplicationStatus:function(){this.applicationCompleted=!this.applicationCompleted}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:"Apply for a loan"}]}}},f=(o(319),Object(c.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page-content page--apply"},[t.applicationCompleted?o("div",[o("h3",[t._v("\n      Congrats on completing your application!\n    ")])]):o("div",[o("h3",[t._v("\n      "+t._s(t.loanProduct.amortizationTerm)+"-Year "+t._s(t.loanProduct.amortizationType)+"\n    ")]),t._v(" "),o("table",{staticClass:"table table-striped page--apply__table"},[o("tbody",[o("tr",[o("td",[t._v("\n            "+t._s(t._f("titlecase")("One Free Guarantee"))+"\n          ")]),t._v(" "),o("td",[t._v("\n            "+t._s(t._f("currency")(t.loanProduct.fee))+"\n          ")])]),t._v(" "),o("tr",[o("td",[t._v("\n            "+t._s(t._f("titlecase")("Loan Amount"))+"\n          ")]),t._v(" "),o("td",[t._v("\n            "+t._s(t._f("currency")(t.application.loanamount))+"\n          ")])]),t._v(" "),o("tr",[o("td",[t._v("\n            "+t._s(t._f("titlecase")("Interest Rate"))+"\n          ")]),t._v(" "),o("td",[t._v("\n            "+t._s(t._f("percent")(t.loanProduct.rate/100))+"\n          ")])]),t._v(" "),o("tr",[o("td",[t._v("\n            "+t._s(t._f("capitalize")("APR"))+"\n          ")]),t._v(" "),o("td",[t._v("\n            "+t._s(t._f("percent")(t.loanProduct.apr/100))+"\n          ")])]),t._v(" "),o("tr",[o("td",[t._v("\n            "+t._s(t._f("titlecase")("Monthly Payment"))+"\n          ")]),t._v(" "),o("td",[t._v("\n            "+t._s(t._f("currency")(t.loanProduct.totalPayment))+"\n          ")])])])]),t._v(" "),o("Form")],1)])}),[],!1,null,null,null));e.default=f.exports}}]);