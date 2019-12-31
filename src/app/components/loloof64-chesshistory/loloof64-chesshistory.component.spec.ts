import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Loloof64ChesshistoryComponent } from './loloof64-chesshistory.component';

describe('Loloof64ChesshistoryComponent', () => {
  let component: Loloof64ChesshistoryComponent;
  let fixture: ComponentFixture<Loloof64ChesshistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Loloof64ChesshistoryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Loloof64ChesshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
