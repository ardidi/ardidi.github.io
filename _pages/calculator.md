---
layout: page
title: 退休計算機
permalink: /calculator
comments: true
---
<div class="row justify-content-between">
    <div class="col-md-12 pr-5">
        <form id="FireCalcForm">
            <div class="card rounded-0">
                <h3 class="card-header h5 rounded-0">
                    計算總表 <span id='msg'> </span>
                </h3>
                <div class="card-block">
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                                <label for="myinput">年紀</label>
                                <input type="number" class="form-control" id="age" value="30" placeholder="幾歲">
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group">
                                <label for="myinput">預期死亡年齡 <a href="#" data-toggle="tooltip" title="106年國人平均壽命達80.4歲，男性77.3歲，女性83.7歲">[?]</a></label>
                                <input type="number" class="form-control" id="lifeExpect" value="80" placeholder="幾歲">
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <label for="myinput">家庭狀態</label>
                                (
                                <label class="u-check g-pl-25">
                                    <input class="g-hidden-xs-up g-pos-abs g-top-0 g-left-0" type="checkbox" value="1" id="married">
                                    <div class="u-check-icon-checkbox-v4 g-absolute-centered--y g-left-0">
                                        <i class="fa" data-check-icon=""></i>
                                    </div>
                                    已婚
                                </label>
                                )
                            <select class="custom-select mb-3" id="expense_kids">
                                <option value="0" selected>無小孩</option>
                                <option value="1">育有一位孩子</option>
                                <option value="2">育有二位孩子</option>
                                <option value="3">育有三位孩子</option>
                                <option value="4">育有四位孩子</option>
                                <option value="5">育有五位孩子</option>
                            </select>
                            <small>會多加上每年孩子花費 </small>
                        </div>
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label for="myinput">希望在幾年後退休? (退休年齡： <span id="retire_age"> </span> 歲)</label>
                                <input type="number" id="work_years" class="form-control" placeholder="Years left to work" value="25" min="0" max="100" onInput="work_years_slider.value=work_years.value" />
                                <input type="range" id="work_years_slider" class="form-control-range" value="25" min="0" max="100" onInput="work_years.value=work_years_slider.value" />
                                <small></small>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5">
                            <div class="form-group">
                                <h3>右圖列出您未來<label for="myinput" id="yearsRemain">...</label> 年資產增長方式 </h3>
                                <h3>當您<label id="retire_start">...</label>歲退休時，您的總資產將有<label id="retirement_savings_start">...</label>，到達 <span id="life_end"></span>歲時，你的總資產將可達到<label id="retirement_savings_end">...</label> </h3>
                                <h5>整體結論：<label id="result" style="color: #FF0000; font-weight: bold;">...</label></h5>
                                <p>請記住：我們是依照您輸入的參數，來調整您可能的現金流，此計算機使用的參數僅為簡化計算，並非專業的財務規劃建議，本站目前無推薦財務規劃師。</p>
                            </div>
                        </div>
                        <div class="col-sm-7" id="chartHere">
                            <canvas id="myChart" style="min-width: 310px; min-height: 800px; margin: 0 auto"></canvas>
                        </div>
                    </div> <!-- row -->
                </div>
                <!--end panel body -->
            </div> <!-- end panel -->
            <div class="card g-brd-primary rounded-0 mt-2">
                <h3 class="card-header h5 text-white g-bg-primary g-brd-transparent rounded-0">
                    目前家庭收入及存款 (現金流入)
                </h3>
                <div class="card-block">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">一年家庭薪資收入</label>
                                <input type="text" class="form-control currency" id="income" value="800000" placeholder="新台幣">
                                <small> 稅前 </small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput"> 薪資成長率(%) </label>
                                <input type="number" class="form-control" id="income_inflation_rate" value="3.0" placeholder="% average salary growth">
                            </div>
                        </div>
                        <div class="col-sm-6"></div>
                    </div> <!-- row -->
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput"> 現有投資以及存款</label>
                                <input type="text" class="form-control currency" id="savings" value="1000000" placeholder="新台幣">
                                <small> 包括定存、活存、股票、儲蓄險等... </small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput"> 投資報酬率(%) </label>
                                <input type="number" class="form-control" id="savings_apy" value="6.0" placeholder="% average Savings">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <h4>
                                第一年投資收入 $<label for="myinput" id="savings_interest_income">...</label>
                            </h4> <small> </small>
                        </div>
                    </div> <!-- row -->
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="myinput">每年固定收入</label>
                                <input type="text" class="form-control currency" id="income_realestate_rentals" value="0" placeholder="% Average return ">
                                <small> (收租、每年家人或兒女孝親費)</small>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <h4>
                                固定收入每年 $<label for="myinput" id="income_realestate_rentals_income">...</label>
                            </h4>
                            <p> </p>
                        </div>
                    </div> <!-- row -->
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">繼承遺產</label>
                                <input type="text" class="form-control currency" id="income_inheritance" value="0" placeholder="Inheritance lump sum">
                                <small> 遺產所得
                                </small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group-sm">
                                <label for="myinput">得到遺產的年紀</label>
                                <input type="number" class="form-control" id="income_inheritance_age" value="60" placeholder="Age Inheritance Sale Recieved ">
                                <small> 這筆錢進來的年紀 </small>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput"> 勞工退休金(月) </label>
                                <input type="text" class="form-control currency" id="retirement" value="13944" placeholder="Current Retriment">
                                <small> 勞工退休金試算，請填入「預估每月可領月退休金」 (來源:<a href='https://calc.mol.gov.tw/trial/personal_account_frame.asp' target="_blank"> 勞工個人退休金試算 </a> ) （夫妻2人請加總)</small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput"> 平均餘命(勞退) </label>
                                <input type="number" class="form-control" id="retirement_give_years" value="20" placeholder="% Expected rate of return "><small> 請按照左方試算表輸入(20或24) </small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">勞保年金給付(月)</label>
                                <input type="text" class="form-control currency" id="income_tss" value="28396" placeholder="Annual Pension income">
                                <small> 勞保年金試算，請填入試算完後最高 (來源:<a href='https://www.bli.gov.tw/0014040.html' target="_blank"> 勞保年金給付試算 </a> )（夫妻2人請加總)</small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group-sm">
                                <label class="myinput">
                                    年金＆退休金給付年紀</label>
                                <input type="number" class="form-control" id="age_ssn_eligible" value="65" placeholder="勞保退休年紀">
                                <small>請使用左方連結試算中的退休年紀</small>
                            </div>
                        </div>
                    </div> <!-- row -->
                </div>
                <!--end panel body -->
            </div> <!-- end panel -->
            <div class="card g-brd-lightred rounded-0 mt-2">
                <h3 class="card-header h5 text-white g-bg-lightred g-brd-transparent rounded-0">
                    全家總開銷 (現金流出)
                </h3>
                <div class="card-block">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="myinput">綜合所得稅</label>
                                <input type="text" class="form-control currency" id="expense_tax_income" value="0" placeholder="Income Taxes ">
                                <small> 依照107年度估算稅金(Soucre: <a href='https://www.etax.nat.gov.tw/etwmain/front/ETW158W1'>綜合所得稅試算 </a> </small>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="myinput">保險費、醫藥費 </label>
                                <input type="text" class="form-control currency" id="expense_healthcare" value="20000" placeholder="Healthcare costs">
                                <small>每年的保險以及醫藥費</small>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="myinput">通膨率(%)</label>
                                <input type="number" class="form-control" id="expense_inflation_rate" value="1.5" placeholder="Projected Inflation rate">
                                <small>每年通貨膨脹率</small>
                            </div>
                        </div>
                    </div> <!-- row -->
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">每年房貸費用</label>
                                <input type="text" class="form-control currency" id="expense_house" value="240000" placeholder="Mortage or Rent">
                                <small> 請填年繳金額，無房貸填0 </small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">房貸剩幾年?</label>
                                <input type="number" class="form-control" id="expense_house_term" value="30" placeholder="Years left on mortgage">
                                <small> 請填剩餘年限，無房貸填0 </small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">租房租金 or 房屋稅 (年)</label>
                                <input type="text" class="form-control currency" id="expense_house_tax" value="20000" placeholder="Housing propety tax">
                                <small> 有房填寫填寫房屋稅，如果是租房填寫房租 （別忘了管理費等雜項加總）</small>
                            </div>
                        </div>
                    </div> <!-- row -->
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput"><span id="expense_kids_count" class="kiddies"> </span> 位兒女，仍須養育幾年 </label>
                                <input type="number" class="form-control" id="expense_kids_term" value="22" placeholder="Dependant Years">
                                <small> 如果兩位以上請平均仍須養育的歲數，例如說一位10年，一位12年，請輸入11。</small>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <h4>
                                兒女 <label for="myinput" id="expense_kids_count" class="kiddies">...</label> 人總共花費約<label for="myinput" id="expense_kids_total">...</label>
                            </h4> <small> 小孩花費很貴der (Source:<a href='https://www.cmoney.tw/notes/note-detail.aspx?nid=94937' target="_blank"> 每個小孩平均每月花費 新台幣$16841 = 新台幣$202092/年 </a> ) </small>
                        </div>
                    </div> <!-- row -->
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">飲食費 (年)</label>
                                <input type="text" class="form-control currency" id="expense_food" value="120000" placeholder="Cost of Food for a year">
                                <small> 年度</small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">水電瓦斯電信費 (年) </label>
                                <!-- https://www.energystar.gov/products/where_does_my_money_go -->
                                <input type="text" class="form-control currency" id="expense_utilities" value="30000" placeholder="Cost of Utilities ">
                                <small> 我家電費兩個月八千元 T.T </small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">交通費 (年) </label>
                                <input type="text" class="form-control currency" id="expense_transport" value="40000" placeholder="Transportation costs ">
                                <small> 開車可填寫油錢、搭大眾運輸可填寫車票錢 </small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">其他費用 (年)</label>
                                <input type="text" class="form-control currency" id="expense_misc" value="100000" placeholder="Cost of Vacation">
                                <small> 旅遊、紅包、孝親費、其餘雜項 </small>
                            </div>
                        </div>
                    </div> <!-- row -->
                </div> <!-- end panel body-->
                <div class="panel-footer"> </div>
            </div>
            <div class="card g-brd-teal rounded-0 mt-2">
                <h3 class="card-header h5 text-white g-bg-teal g-brd-transparent rounded-0">
                    存檔與列印
                </h3>
                <div class="card-block">
                    <button class="btn u-btn-black" type="button" onClick="SaveForm(); notify('已計算完成')">重新計算</button>
                    <button class="btn u-btn-black" type="button" onClick="SaveForm(); notify('已存擋') ">存檔 (僅本機端)</button>
                    <button class="btn u-btn-black" type="reset" onClick="localStorage.clear(); notify('已重置回預設值') ">重置回本站預設值 </button>
                    <!--button class="btn btn btn-info" type="button" onClick="DownLoadCSV()">Download CSV</button-->
                </div>
            </div>
        </form>
    </div>
</div>
<script>
//Script-wide variables	
var incomes = []; //array will hold all income objects 
var expenses = []; //array will hold all expense objects

//arrays hold chart formatted data
var chart_income = [];
var chart_investment_income = [];
var chart_retirement_income = [];
var chart_expenses = [];
var chart_savings = [];
var labels_years = [];

var tax_bracket_pct = 0;
</script>

<script src="{{ site.baseurl }}/assets-custom/calculator/calculator.js"></script>