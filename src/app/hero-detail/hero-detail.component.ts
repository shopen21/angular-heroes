import {Component, Input, OnInit, Inject, OnChanges, SimpleChanges} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {HeroCrudService} from '../core/hero-crud.service';
import {HERO_CRUD_SERVICE} from '../core/hero.service';
import {Hero} from '../core/hero';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StatesService} from '../core/states.service';
import {Address} from "app/core/address";

@Component({
  selector: 'sho-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit, OnChanges {

  @Input() hero: Hero;

  heroForm: FormGroup;
  states: string[] = [];

  constructor(@Inject(HERO_CRUD_SERVICE) private heroService: HeroCrudService,
              private location: Location,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private stateService: StatesService) {
    this.createForm();
  }

  ngOnInit(): void {
    const component = this;
    this.route.params
      .switchMap((params: Params) => component.heroService.getHero(+params.id))
      .subscribe(hero => {
        this.hero = hero;
        this.initializeHeroForm(hero);
      });

    this.stateService.getStates().then(states => this.states = states).catch(() => this.states = ['N/A'])
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hero) {
      this.initializeHeroForm(changes.hero.currentValue)
    }
  }

  private createForm() {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      addresses: this.fb.array([])
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.prepareSaveHero()).then(() => this.goBack());
  }

  private prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;

    // deep copy of form model lairs
    const addressesDeepCopy: Address[] = formModel.addresses.map(
      (address: Address) => Object.assign({}, address)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const result: Hero = {
      id: this.hero.id,
      isSecret: this.hero.isSecret,
      name: formModel.name as string,
      addresses: addressesDeepCopy
    };
    return result;
  }

  revert(): void {
    this.initializeHeroForm(this.hero);
  }

  private initializeHeroForm(hero: Hero): void {
    this.heroForm.reset({
        name: hero.name});
    this.setAddresses(hero.addresses);
  }

  private setAddresses(addresses: Address[]): void {
    const addressFormGroups = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFormGroups);
    this.heroForm.setControl('addresses', addressFormArray);
  }

  addAddress() {
    this.addressFormArray.push(this.fb.group(new Address()));
  }

  removeAddress(index: number) {
    this.addressFormArray.removeAt(index);
  }

  get addressFormArray(): FormArray{
    return this.heroForm.get('addresses') as FormArray;
  }
}
