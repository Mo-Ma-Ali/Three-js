import vector from "./vector";

class Entity{
    constructor(
        AllForce,//what is the use of this?كل القوة المؤثره
        p=1000,//كثافه الماء
        volume,//حجم
        m,//كتله

    ){
        this.g=vector(0,-9.81,0);
        this.AllForce=vector;
        this.m=m;//كتله
        this.volume=volume;
        this.p=p;
        this.speed=vector.create(0,0,0);//2d but call it as 3d! need edit!! سرعه القارب
        this.drag=0.5;//سحب
        this.begin=vector.create(0,0);//here is how you call the 2d vector///
        this.direction=vector.create(0,0,-1);
        this.Speedangular=0;
    }
}
class Boat extends Entity{
    constructor(
        AllForce,//كل القوة المؤثره
        p=1000,//كثافه الماء
        volume,//حجم
        m,//كتله

    ){
        super(AllForce, p, volume, m);
    }
    turn(direction)
    {
        this.Speedangular+=0.01*direction; //corrected the error in the turn function
        return this.Speedangular;
    }
    Get_Direction()
    {
        return this.direction;
    }
    Water_resistance()//مقاومة الماء 
    {
        ////////////////////////////////
        const DragForce=this.speed*=vector.multiply(this.drag,this.drag); /*use a function with two parimater
         but defined it with one*/
        this.AllForce.add(DragForce);
    }
    gravity()//لتوازن القارب
    {
        const Gravity=this.g*=vector.multiply(this.m,this.m);
        this.AllForce.add(Gravity);
    }
    Float_application()//تطبيق الطفو
    {
        const Force=this.p*this.volume*9.18;
        const Buoyant_force=vector.create(0,Force);/*same as last, created a 2d Vector but used it as 3d
         الطفو على المحور y لفوق*/ 
        const S= this.speed*=vector.multiply(this.drag,this.drag);/* عنا قوه السحب 0.5 
        السرعه عطيناها فوق قيمه ابتدائيه وهون حدثناها عل محور x and y 
        بقوة السحب
        */
       this.AllForce.add(Buoyant_force);
       this.AllForce.add(S);
       //**قانون نيوتن التاني  a=f/m*/
       const Acceleration=this.AllForce.divide(this.m,this.m);//////////////
       this.speed.add(Acceleration);
    }
    GetSpeed()
    {
        return this.speed;
    }
    resetBoat()
    {
       // اعاده القارب لمكانه الابتدائي
       this.begin=vector.create(0,0);
    }
}
let test = new Boat(120,22,10,100);
console.log(test.turn(1));
class Water extends Entity{}

class Waves extends Entity{}