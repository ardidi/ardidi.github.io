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
    return "$" + val.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

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

    $('.currency').mask("#,##0", {reverse: true});

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
    $("#retire_start").text(retire_age);
    $("#life_end").text($("#lifeExpect").val());

    //Income 
    var income_saved = accounting.unformat($("#income").val()) * $("#income_savings_rate").val() / 100;
    $("#income_saved").text(formatTWD(income_saved));

    var savings_interest_income = accounting.unformat($("#savings").val()) * $("#savings_apy").val() / 100;
    $("#savings_interest_income").text(savings_interest_income);

    var income_realestate_rentals_income = accounting.unformat($("#income_realestate_rentals").val());
    $("#income_realestate_rentals_income").text(income_realestate_rentals_income);

    //Expenses:
    var expense_kids_assumption = 202092; //annual cost to raise a child
    var expense_kids_total = $("#expense_kids").val() * $("#expense_kids_term").val() * expense_kids_assumption;

    $("#expense_kids_total").text(formatTWD(expense_kids_total));
    $(".kiddies").text($("#expense_kids").val())

    //Projection Model Let's begin creating a year by YEARLY array of incomes and expenses

    var i;

    var income_inflation_rate = parseFloat($("#income_inflation_rate").val() / 100);
    var work_years = parseInt($("#work_years").val()); //how many more years to work - receive full income
    var ssn_year_eligible = $("#age_ssn_eligible").val(); // what year start receiving social security
    var retirement_give_years = $("#retirement_give_years").val(); // what year start receiving social security
    var inheritance_age = $("#income_inheritance_age").val(); // age when you project to get one time inheritance.
    var married = 0;
    if ($("#married").is(':checked'))
        var married = 1;
    else
        var married = 0;

    var start_retire_saving=0;
    var end_life_saving=0;


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
        ai.income_earned = (i <= work_years) ? accounting.unformat($("#income").val())*ai.income_inflation_rate : 0;

        ai.one_time = (ai.age == inheritance_age) ? accounting.unformat($("#income_inheritance").val()) : 0;
        ai.rents = accounting.unformat($("#income_realestate_rentals").val());
        ai.ssn = (ai.age >= ssn_year_eligible) ? accounting.unformat($("#income_ss").val()) : 0;

        ai.savings = ai.income_earned + accounting.unformat($("#savings").val()) + ai.rents;
        ai.savings_Int = ai.savings * parseFloat($("#savings_apy").val() / 100);

        ai.savings = accounting.unformat($("#savings").val()) + ai.rents;
        ai.savings_Int = ai.savings * parseFloat($("#savings_apy").val() / 100);

        ai.retirement = accounting.unformat($("#retirement").val());
        ai.income_tss = accounting.unformat($("#income_tss").val());

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
//                console.log( (parseInt(work_years)+1) +" "+ i);

            if ( (parseInt(work_years)+1)  == i){
                $("#retirement_income_start").text(formatTWD(ai.retirement_income));
                $("#retirement_savings_start").text(formatTWD(ai.savings));
                start_retire_saving=ai.savings;
            }else{
                $("#retirement_income_end").text(formatTWD(ai.retirement_income));
            }

            $("#retirement_savings_end").text(formatTWD(ai.savings));
            end_life_saving=ai.savings;

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

        exp.income_tax = accounting.unformat($("#expense_tax_income").val());
        exp.healthcare = accounting.unformat($("#expense_healthcare").val())

        //how long to counts your  mortgage
        house_term = accounting.unformat($("#expense_house_term").val());
        exp.housing = (i < house_term) ? accounting.unformat($("#expense_house").val()) : 0;
        exp.property_tax = accounting.unformat($("#expense_house_tax").val());

        //how many years kids are your dependants  for how long -  use an average for multiple ages
        dependants_years = accounting.unformat($("#expense_kids_term").val());
        exp.dependants = (i < dependants_years) ? $("#expense_kids").val() * expense_kids_assumption : 0;

        exp.food = accounting.unformat($("#expense_food").val());
        exp.utilities = accounting.unformat($("#expense_utilities").val());
        exp.transport = accounting.unformat($("#expense_transport").val());
        exp.optional = accounting.unformat($("#expense_misc").val());

        //	exp.debt=parseInt( $("#expense_debt").val()  );
        //	exp.debt_payoff_years=parseInt( $("#expense_debt_payoff_years").val()  );
        //	exp.debt_payoff_years =isNaN(parseFloat(exp.debt_payoff_years)) ? 0: exp.debt_payoff_years ;

        //	exp.debt_annual=(i <= exp.debt_payoff_years  && exp.debt > 0 && exp.debt_payoff_years>0 ) ? (exp.debt / exp.debt_payoff_years ):0;  //divide initial debt by payoff in years

        exp.inflation_rate = Math.pow(1 + inflation_rate, (i - 1));
        //	console.log(exp.inflation_rate);
        //    exp.total_annual_expenses = tax;

        exp.total_annual_expenses = (tax + exp.healthcare + exp.housing + exp.property_tax + exp.dependants + exp.food + exp.utilities + exp.transport + exp.optional);

//        console.log(tax + " " + exp.healthcare + " " + exp.housing + " " + exp.property_tax + " " + exp.dependants + " " + exp.food + " " + exp.utilities + " " + exp.transport + " " + exp.optional);

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
//        console.log(JSON.stringify(obj));
    });

    console.log("=====ANNUAL EXPENSES ==============");
    expenses.forEach(function(obj) {
  //      console.log(JSON.stringify(obj));
        n = (obj.i - 1);

        var diff = (incomes[n].total_annual_income.toFixed(2) - expenses[n].total_annual_expenses.toFixed(2));
//        console.log("Annual Income: " + incomes[n].total_annual_income.toFixed(2) + " -  " + expenses[n].total_annual_expenses.toFixed(2) + " Expenses  =   " + diff.toFixed(2));


    });

//start_retire_saving
//end_life_saving
    if(end_life_saving<0){
        $("#result").text("您的財務需要進行調整，建議您延後退休或是降低開銷，或是開始閱讀我們的網站。");
    }else if(start_retire_saving >= end_life_saving){
        $("#result").text("您的退休生活無虞，但如果遭遇巨大風險時可能無法承受，您可以再閱讀我們網站獲得更多想法。");
    }else if(start_retire_saving < end_life_saving){
        $("#result").text("您的退休成功率極高，建議您隨時檢視自己的收入支出及保險，並且多多回來閱讀我們網站，讓你的退休獲得更大保障。");
    }else{
        $("#result").text("應該不會有這樣的情況，如果出現請將設定給我看一下XD");
    }

    //Updatge the Chart
    plotChart();

    //Forms Changed lets Save The values in local storage
    // SaveForm();
}

function plotChart() {
    $("#myChart").remove();
    $("#chartHere").html('<canvas id="myChart"></canvas>');

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
            maintainAspectRatio: false,
            aspectRatio: 1,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '您的資產預測圖'
            },
            scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                      if(parseInt(value) >= 1000){
                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      } else {
                        return '$' + value;
                      }
                    }
                  }
                }]
              }
        }
    }); //end of chart
}