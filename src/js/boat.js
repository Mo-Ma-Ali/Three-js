import vector from "./vector";
import Const from "./const";
class Entity{

}
class boat extends Entity{
    constructor(
        //  عوامل مؤثره

    ){
        //قيم ابتدائيه منستعملها بالفانكشن
        // اسناد العوامل المؤثره لي فوق هون ولح نستعملها تحت بالقوانين عن طريق this
        this.begin=vector.create(0,0);
        this.g=0;
    }
    resetBoat()
    {
       // اعاده القارب لمكانه الابتدائي
       this.begin=vector.create(0,0);
    }
   // حساب الجاذبيه 
   calculate()
   {
    this.g=vector.create(0,
        // الجاذبيه المحور y 
        // القانون هون
    );
   }
    

   
}

class Waves extends Entity{}