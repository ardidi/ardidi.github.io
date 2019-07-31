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
                        <div class="col-sm-4">
                            <div class="form-group">
                                <h3> 還有 <label for="myinput" id="yearsRemain">...</label> 年的人生 </h3>
                                <p>依照你的預期壽命以及收入支出，來計算你的現金流
                                    <h3>當你最終到達 <span id="life_end"> </span>歲的時候，你的總資產將會達到<label id="retirement_savings_end">...</label> </h3>
                                    我們建議您可以調整通膨率及投資報酬率，你會發現在不同條件下對整體資產的影響相當的巨大。</p>
                            </div>
                        </div>
                        <div class="col-sm-8" id="chartHere">
                            <canvas id="myChart" style="min-width: 310px; height: 400px; margin: 0 auto"></canvas>
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
                                <input type="number" class="form-control" id="income" value="800000" placeholder="新台幣">
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
                                <input type="number" class="form-control" id="savings" value="1000000" placeholder="新台幣">
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
                                <input type="number" class="form-control" id="income_realestate_rentals" value="0" placeholder="% Average return ">
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
                                <input type="number" class="form-control" id="income_inheritance" value="0" placeholder="Inheritance lump sum">
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
                                <input type="number" class="form-control" id="retirement" value="13944" placeholder="Current Retriment">
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
                                <input type="number" class="form-control" id="income_tss" value="28396" placeholder="Annual Pension income">
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
                                <input type="number" class="form-control" id="expense_tax_income" value="0" placeholder="Income Taxes ">
                                <small> 依照107年度估算稅金(Soucre: <a href='https://www.etax.nat.gov.tw/etwmain/front/ETW158W1'>綜合所得稅試算 </a> </small>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="myinput">保險費、醫藥費 </label>
                                <input type="number" class="form-control" id="expense_healthcare" value="20000" placeholder="Healthcare costs">
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
                                <input type="number" class="form-control" id="expense_house" value="240000" placeholder="Mortage or Rent">
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
                                <input type="number" class="form-control" id="expense_house_tax" value="20000" placeholder="Housing propety tax">
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
                                <input type="number" class="form-control" id="expense_food" value="120000" placeholder="Cost of Food for a year">
                                <small> 年度</small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">水電瓦斯電信費 (年) </label>
                                <!-- https://www.energystar.gov/products/where_does_my_money_go -->
                                <input type="number" class="form-control" id="expense_utilities" value="30000" placeholder="Cost of Utilities ">
                                <small> 我家電費兩個月八千元 T.T </small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">交通費 (年) </label>
                                <input type="number" class="form-control" id="expense_transport" value="40000" placeholder="Transportation costs ">
                                <small> 開車可填寫油錢、搭大眾運輸可填寫車票錢 </small>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="myinput">其他費用 (年)</label>
                                <input type="number" class="form-control" id="expense_misc" value="100000" placeholder="Cost of Vacation">
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


/** DownLoadJSON function converts INCOME/EXPENSE JSON into Downloadable format
 *
 */

function DownLoadCSV() {

    var jsonObject = JSON.stringify(incomes);

    //var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(incomes));
    dataStr = "data:text/csv;charset=utf-8," + ConvertToCSV(jsonObject);
    var dlAnchorElem = document.getElementById('downloadJsonDIV');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "incomes_by_year.csv");
    dlAnchorElem.click();
}


// JSON to CSV Converter
function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}


/** Simple JQuery notification for 
 *
 */
function notify(msg) {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    $("#msg").text(msg);
    console.log(msg);
}

/**
 * Simple income_tax_bracket(income)
 * 
 */
function income_tax(val, married, child) {

    //一般扣除額 + 標準扣除額
    var finalval = val - (88000 * (married + child)) - (200000 * (1 + married));

    if (finalval <= 0) {
        return 0;
    } else if (finalval > 0 && finalval <= 540000)
        return finalval * 0.05;
    else if (finalval > 540000 && finalval <= 1210000)
        return (finalval - 540000) * 0.12 + 37800
    else if (finalval > 1210000 && finalval <= 2420000)
        return (finalval - 1210000) * 0.20 + 134600
    else if (finalval > 2420000 && finalval <= 4530000)
        return (finalval - 2420000) * 0.30 + 376600
    else if (finalval > 4530000)
        return (finalval - 4530000) * 0.40 + 829600
    else
        return 0; //return the fax amount
}

/**
 * Number.prototype.format(n, x)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
function formatTWD(val) {
    //	console.log("Formating USD: "+val);
    val = isNaN(parseFloat(val)) ? 0 : val; //check for invalid values
    return "新台幣$" + val.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    //	return "新台幣$"+(val).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
};


/** reloadSaved()  reloads saved form data if any exists */
function reloadSaved() {

    $.each($('form input'), function() {
        input_name = $(this).attr('id');
        if (localStorage[input_name]) {
            if ($(this).attr('type') == 'checkbox' && localStorage[input_name] == 1)
                $(this).prop('checked', true);
            else
                $(this).val(localStorage[input_name]);
            //				console.log("Restoring: "+input_name +" with "+localStorage[input_name]  ) ;
        }
    });


    $.each($('form select'), function() {
        input_name = $(this).attr('id');
        if (localStorage[input_name]) {
            $(this).val(localStorage[input_name]);
            //			console.log("Restoring: "+input_name +" with "+localStorage[input_name]  ) ;
        }
    });

}

/** SaveForm()  saves ALL form data into LocalStorage */
function SaveForm() {

    $.each($('#FireCalcForm :input'), function() {
        input_name = $(this).attr('id');
        localStorage[input_name] = $(this).val();
        //  console.log("Saving: "+input_name +" = "+ $(this).val() ) ;

    });

}

/** Start of JQuery document.load function */
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    reloadSaved(); //Reload LocalStorage Form elements - if exsits
    Calculate(); // Recalculate 

    // Bind all form-control changes to trigger the Calculate event
    $("#work_years_slider").change(function() {
        Calculate(); //Re-Calcualte the Model
    });

    $('.form-control').bind("change", function() {
        Calculate(); //Re-Calcualte the Model
    });

});


/** main Calculate function */
function Calculate() {
    //Calculate years remaing
    var currentAge = $("#age").val() - 1;
    var years = $("#lifeExpect").val() - currentAge;
    var retire_age = parseInt(currentAge) + parseInt($("#work_years").val()) + 1;
    $("#yearsRemain").text(years);
    $("#work_years_slider").attr('max', years); //set the Retire age max to remaining lifetime
    $("#retire_age").text(retire_age);
    $("#life_end").text($("#lifeExpect").val());

    //Income 
    var income_saved = $("#income").val() * $("#income_savings_rate").val() / 100;
    $("#income_saved").text(formatTWD(income_saved));

    var savings_interest_income = $("#savings").val() * $("#savings_apy").val() / 100;
    $("#savings_interest_income").text(savings_interest_income);

    var income_realestate_rentals_income = $("#income_realestate_rentals").val();
    $("#income_realestate_rentals_income").text(income_realestate_rentals_income);

    //Expenses:
    var expense_kids_assumption = 202092; //annual cost to raise a child
    var expense_kids_total = $("#expense_kids").val() * $("#expense_kids_term").val() * expense_kids_assumption;

    $("#expense_kids_total").text(formatTWD(expense_kids_total));
    $(".kiddies").text($("#expense_kids").val())

    //Projection Model Let's begin creating a year by YEARLY array of incomes and expenses

    var i;

    var income_inflation_rate = parseFloat($("#income_inflation_rate").val() / 100);
    var work_years = $("#work_years").val(); //how many more years to work - receive full income
    var ssn_year_eligible = $("#age_ssn_eligible").val(); // what year start receiving social security
    var retirement_give_years = $("#retirement_give_years").val(); // what year start receiving social security
    var inheritance_age = $("#income_inheritance_age").val(); // age when you project to get one time inheritance.
    var married = 0;
    if ($("#married").is(':checked'))
        var married = 1;
    else
        var married = 0;


    incomes = []; //reset the incomes array for new 
    expenses = []; //reset the incomes array for new ..

    chart_income.length = 0;
    chart_investment_income.length = 0;
    chart_retirement_income.length = 0;
    chart_expenses.length = 0;
    chart_savings.length = 0;
    labels_years.length = 0;

    var inflation_rate = parseFloat($("#expense_inflation_rate").val() / 100);

    for (i = 1; i < years + 1; i++) {
        var ai = {}; //define a Income blank object
        var exp = {}; //define an Expense object
        //create an Annual Income object
        ai.i = (i);
        ai.age = (+i + +currentAge);

        ai.income_inflation_rate = Math.pow(1 + income_inflation_rate, (i - 1));
        //	console.log(i+" < "+work_years);
        ai.income_earned = (i <= work_years) ? parseInt($("#income").val())*ai.income_inflation_rate : 0;

        ai.one_time = (ai.age == inheritance_age) ? parseInt($("#income_inheritance").val()) : 0;
        ai.rents = parseFloat($("#income_realestate_rentals").val());
        ai.ssn = (ai.age >= ssn_year_eligible) ? parseFloat($("#income_ss").val()) : 0;

        ai.savings = ai.income_earned + parseFloat($("#savings").val()) + ai.rents;
        ai.savings_Int = ai.savings * parseFloat($("#savings_apy").val() / 100);

        ai.savings = parseFloat($("#savings").val()) + ai.rents;
        ai.savings_Int = ai.savings * parseFloat($("#savings_apy").val() / 100);

        ai.retirement = parseFloat($("#retirement").val());
        ai.income_tss = parseFloat($("#income_tss").val());

        //	ai.retirement_Int=parseInt( $("#retirement").val() ) * parseFloat( $("#retirement_apy").val()/100 ) ;

        //AFTER year 1, add last years gains to this years income, FOR SIMPLICITY of computation interest is compounded 1x a year
        if (i >= 2) {
            //update the savings information , adjust interest compounding (to daily/monthly) if neecessary.
            //		console.log( incomes[i-2].income_saved +" "+ incomes[i-2].savings +" "+ incomes[i-2].savings_Int );
            ai.savings = (incomes[i - 2].income_earned + incomes[i - 2].savings + incomes[i - 2].savings_Int) + ai.one_time + ai.rents;
            ai.savings_Int = Math.max(0, (incomes[i - 2].savings * parseFloat($("#savings_apy").val() / 100)));
        }

        //Now calculate how much to withdraw from savings and retirement accounts AFTER we're RETIRED
        if (i > work_years) { //退休後生活

            //		ai.retirement_income=(withdraw_rate*ai.savings);	

            //	  	ai.savings = ai.savings-(withdraw_rate*ai.savings);

            //TODO: adjust retirement withdraw only after AGE 60 (USA time when no penalty)
            //		ai.retirement= ai.retirement - (withdraw_rate*ai.retirement  ) ; //subract % from retirment investments

            //console.log(i+" > workyears+2 "+(+work_years+2)+" withdraw:"+withdraw_rate+ " on savings "+ai.savings);
            if ((+work_years + 1) == i) //Show first and last year how much retirement income we get.
                $("#retirement_income_start").text(formatTWD(ai.retirement_income));
            else
                $("#retirement_income_end").text(formatTWD(ai.retirement_income));

            $("#retirement_savings_end").text(formatTWD(ai.savings));
        }

        if (ai.age > ssn_year_eligible) { //勞保+勞退開始年紀
            //		console.log(parseFloat(ssn_year_eligible) + parseFloat(retirement_give_years));
            if (ai.age <= parseFloat(ssn_year_eligible) + parseFloat(retirement_give_years))
                ai.retirement_income = (ai.retirement * 12) + (ai.income_tss * 12);
            else
                ai.retirement_income = ai.income_tss * 12;
            ai.savings += ai.retirement_income;
        }

        //annual income - just what I made THIS yer. 
        ai.total_annual_income = ai.income_earned + ai.savings_Int + ai.rents + ai.one_time;
        ai.total_annual_investment_income = ai.savings_Int + ai.rents + ai.one_time
        ai.total_annual_retirement_income = ai.retirement_income;

        ai.total_annual_income_taxable = ai.income_earned - ai.one_time; //remove the inheirtance from taxable income

        incomes.push(ai); //add this object to the incomes array


        //Lets calculate all expenses.
        //Simple Tax bracket calculation - adjusted each year
        exp.i = (i);
        var tax = income_tax(ai.total_annual_income_taxable, married, $("#expense_kids").val());

        if (i == 1) {
            $("#expense_tax_income").val(tax);
        }
        //     exp.tax_bracket= tax_rate;

        exp.income_tax = parseFloat($("#expense_tax_income").val());
        exp.healthcare = parseFloat($("#expense_healthcare").val())

        //how long to counts your  mortgage
        house_term = parseInt($("#expense_house_term").val());
        exp.housing = (i < house_term) ? parseInt($("#expense_house").val()) : 0;
        exp.property_tax = parseInt($("#expense_house_tax").val());

        //how many years kids are your dependants  for how long -  use an average for multiple ages
        dependants_years = parseInt($("#expense_kids_term").val());
        exp.dependants = (i < dependants_years) ? $("#expense_kids").val() * expense_kids_assumption : 0;

        exp.food = parseInt($("#expense_food").val());
        exp.utilities = parseInt($("#expense_utilities").val());
        exp.transport = parseInt($("#expense_transport").val());
        exp.optional = parseInt($("#expense_misc").val());

        //	exp.debt=parseInt( $("#expense_debt").val()  );
        //	exp.debt_payoff_years=parseInt( $("#expense_debt_payoff_years").val()  );
        //	exp.debt_payoff_years =isNaN(parseFloat(exp.debt_payoff_years)) ? 0: exp.debt_payoff_years ;

        //	exp.debt_annual=(i <= exp.debt_payoff_years  && exp.debt > 0 && exp.debt_payoff_years>0 ) ? (exp.debt / exp.debt_payoff_years ):0;  //divide initial debt by payoff in years

        exp.inflation_rate = Math.pow(1 + inflation_rate, (i - 1));
        //	console.log(exp.inflation_rate);
        //    exp.total_annual_expenses = tax;

        exp.total_annual_expenses = (tax + exp.healthcare + exp.housing + exp.property_tax + exp.dependants + exp.food + exp.utilities + exp.transport + exp.optional);

        console.log(tax + " " + exp.healthcare + " " + exp.housing + " " + exp.property_tax + " " + exp.dependants + " " + exp.food + " " + exp.utilities + " " + exp.transport + " " + exp.optional);

        //Now add  PROJECTED INFLATION rate to annual expenses
        exp.total_annual_expenses = exp.total_annual_expenses * exp.inflation_rate;

        expenses.push(exp); //add this object to the incomes array

        // Now calculate SURPLUS OR DEFICIT for the year
        //	var diff=(incomes[i-1].total_annual_income.toFixed(2) - expenses[i-1].total_annual_expenses.toFixed(2) );
        // any money left over place in savings for that year.
        if (i > 1)
            incomes[i - 1].savings = (incomes[i - 1].savings - exp.total_annual_expenses);

        //load the chart data variables
        chart_income.push(Math.floor(incomes[i - 1].income_earned));
        chart_investment_income.push(Math.floor(incomes[i - 1].total_annual_investment_income));
        chart_retirement_income.push(Math.floor(incomes[i - 1].total_annual_retirement_income));
        chart_expenses.push(Math.floor(expenses[i - 1].total_annual_expenses));
        chart_savings.push(Math.floor(incomes[i - 1].savings));
        labels_years.push(ai.age);

    } //end of years loop

    console.log("=====ANNUAL INCOMES ==============");
    incomes.forEach(function(obj) {
        console.log(JSON.stringify(obj));
    });

    console.log("=====ANNUAL EXPENSES ==============");
    expenses.forEach(function(obj) {
        console.log(JSON.stringify(obj));
        n = (obj.i - 1);

        var diff = (incomes[n].total_annual_income.toFixed(2) - expenses[n].total_annual_expenses.toFixed(2));
        console.log("Annual Income: " + incomes[n].total_annual_income.toFixed(2) + " -  " + expenses[n].total_annual_expenses.toFixed(2) + " Expenses  =   " + diff.toFixed(2));


    });

    //Updatge the Chart
    plotChart();

    //Forms Changed lets Save The values in local storage
    // SaveForm();
}

function plotChart() {
    $("#myChart").remove();
    $("#chartHere").html('<canvas id="myChart"  style="min-width: 310px; height: 400px; margin: 0 auto"></canvas>');

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        //type: 'bar',

        // The data for our dataset
        data: {
            labels: labels_years,
            datasets: [{
                    label: '薪資收入',
                    backgroundColor: '#A5DFDF',
                    borderColor: '#A5DFDF',
                    data: chart_income,
                    fill: "origin"
                },
                {
                    label: '被動收入',
                    backgroundColor: '#71fc00',
                    borderColor: '#71fc00',
                    data: chart_investment_income,
                    fill: "origin"
                },
                {
                    label: '退休收入',
                    backgroundColor: '#42588F',
                    borderColor: '##42588F',
                    data: chart_retirement_income,
                    fill: "origin"
                },
                {
                    label: '年度開銷',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: chart_expenses,
                    fill: 'origin'
                },

                {
                    label: '總資產',
                    backgroundColor: '#FFE6AA',
                    borderColor: '#FFE6AA',
                    data: chart_savings,
                    fill: 'origin'
                }

            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '您的資產預測圖'
            }
        }
    }); //end of chart
}
</script>