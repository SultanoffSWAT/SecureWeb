import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonsListComponent } from './course-lessons-list.component';

describe('CourseLessonsListComponent', () => {
  let component: CourseLessonsListComponent;
  let fixture: ComponentFixture<CourseLessonsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseLessonsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseLessonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
