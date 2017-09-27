 var orADD=false;

 //左侧导航Tab
        $('#typeList li').click(function () {
           // alert($(this).index());
            var k=$(this).index();
            $(this).addClass('meShow').siblings().removeClass('meShow');
            // $('#messages div').eq(k).css('display','block').siblings().stop().css('display','none');
            $('#messages div').eq(k).stop().fadeIn(200).siblings().stop().fadeOut(200);

        });

    // $('#messages div').click(function () {   alert($(this).index());  })


/*******************************************  导航管理 *********************************************************/

var MyDomain='http://localhost:3000/menu/';
 $.ajax({
                type:'get',
                url:MyDomain+'mylist',
                async:true,
                success:function (x) {
                        console.log(x);
                        x.map((item,k)=>{
                            $(`.modal-body .MD_menu`).append(`<li key="${item.uid}">
                                        <p>${item.uid}</p>
                                        <p>${item.content}</p>
                                        <p>
                                            <button class="modify" name="modify" onclick="Modify($(this))">修改</button>
                                            <button class="save"  name="save" onclick="Save($(this))">保存</button>
                                            <button class="dele"  name="dele" onclick="Dele($(this))">删除</button>
                                        </p>
                             </li>`);
                        })

                },
                error:function(){
                    alert('出错了!')
                }
            });






  //添加信息(添加DOM)
            function Add(who) {
                        orADD=true;
                    $(`.modal-body .MD_${who} li:eq(1)`).after(`<li>
                        <p  class="uid_2">${who}</p>
                        <p>内容</p>
                         <p>
                             <button class="modify" name="modify" onclick="Modify($(this))">修改</button>
                             <button class="save"  name="save" onclick="Save($(this))">保存</button>
                             <button class="dele"  name="dele" onclick="Dele($(this))">删除</button>
                         </p>
                     </li>`);
            }

            var Obj={};
   //修改信息  modify修改
            function Modify(x) {
            //                console.log(x);
                                 Obj=x;
                           console.log(Obj.parent('p').index());
                Obj.parent('p').parent('li').children(`p:lt(${Obj.parent('p').index()})`).attr('contenteditable',true).focus();
            }
     //删除信息
            function Dele(x) {
            //            console.log(x);
                        Obj=x;
                Obj.parent('p').parent('li').remove();
                doSomthing(Obj);
            }

 //修改后保存信息
             function Save(x) {
                 Obj=x;
                console.log(Obj.parent('p').index());
                Obj.parent('p').parent('li').children(`p:lt(${Obj.parent('p').index()})`).removeAttr('contenteditable');
                Obj.parent('p').parent('li').children(`p:eq(1)`)
                    .text(Obj.parent('p').parent('li').children(`p:eq(1)`).text());
// //                 console.log(Obj.attr('name'));
// //                 console.log(Obj.parent('p').parent('li').children('p:eq(1)').text());
                 doSomthing(Obj);
                console.log( Obj.parent('p').parent('li').children(`p:eq(1)`).text());
            }




       function doSomthing(Obj){
//            console.log(Obj);
           console.log(Obj.attr('name'));
//            console.log(Obj.parent('p').parent('li').children('p:eq(1)').text());
               console.log(orADD);
            var S1=Obj.parent('p').parent('li').children('p:eq(1)').text();
            $.ajax({
                    type:'post',
                    url:MyDomain+'Nav_Do',
                    async:true,
                    data:{
                        'uid':Obj.parent('p').parent('li').attr('key'),
                        'navtxt':S1,
                        'does':Obj.attr('name'),
                        'orADD':orADD
                    },
                    success:function (x) {
                        console.log(x);
                        switch(x.flag){
                            case 0:
                            $('.menu_Tips').text('修改成功');
                            break;
                            case 1:
                            $('.menu_Tips').text('添加成功');
                            break;
                            case 2:
                            $('.menu_Tips').text('删除成功');
                            break;

                        }
                        orADD=false;
                        S1=S2=S3=S4='';
                    }
                });
        }







