import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-color-add',

  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  addColorForm : FormGroup;
  colors  : Color[];

  constructor(
    private dataSharingService : DataSharingService,
    private formBuilder :FormBuilder,
    private toastrService :ToastrService,
    private colorService : ColorService
  ) {}


ngOnInit(): void {
  this.initForm();

  this.dataSharingService.colors$.subscribe(colors => {
    this.colors = colors;
  })
}

initForm()
{
  this.addColorForm = this.formBuilder.group({
    colorName : ["",Validators.required]
  })
}

onSubmit()
{
  if(this.addColorForm.valid)
  {
    let colorObject  = Object.assign({},this.addColorForm.value);

    this.colorService.addColor(colorObject).subscribe(res => {
      this.toastrService.success(res.message,res.title);
      this.addColorForm.reset();

      this.colors.push(res.data);
      this.dataSharingService.setColors(this.colors);
    })
  }
  else{
    this.toastrService.error("Please fill the form.","Error");
  }
}

}
