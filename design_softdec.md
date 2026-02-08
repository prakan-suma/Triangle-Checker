จัดตัวเอกสารให้ในรูปแบบ **Markdown (.md)** เรียบร้อยครับ โดยคงเนื้อหาความหมายเดิม และจัดระเบียบโครงสร้าง (Heading, Tables, Code Blocks) ให้เหมาะสมเพื่อให้ AI Agent สามารถนำไปประมวลผลหรือเขียนโค้ดต่อได้อย่างแม่นยำที่สุดครับ

---

Software Design Document: Triangle Solver Web Application 

1. Introduction (บทนำ) 

1.1 Document Purpose (วัตถุประสงค์ของเอกสาร) 

เอกสารฉบับนี้จัดทำขึ้นเพื่อระบุรายละเอียดการออกแบบซอฟต์แวร์ สำหรับโปรแกรม **"Triangle Solver"** โดยมีวัตถุประสงค์เพื่อแปลงความต้องการของระบบ (Requirement Specification) จาก "อะไร" (WHAT) ให้กลายเป็นแบบร่างทางเทคนิค "อย่างไร" (HOW) เพื่อให้นักพัฒนาสามารถเขียนโปรแกรมได้อย่างถูกต้อง 

1.2 Scope (ขอบเขต) 

การออกแบบครอบคลุมฟังก์ชันการทำงานตาม Requirement ดังนี้: 

* 
**Platform:** Web Application รองรับ Mobile และ Desktop 


* 
**Input Processing:** รับค่าจำนวนจริง 3 จำนวน และตรวจสอบความถูกต้อง (Validation) 


* 
**Logic Calculation:** จำแนกประเภทสามเหลี่ยม (Equilateral, Isosceles, Scalene) และตรวจสอบมุมฉาก (Right Triangle) 


* 
**Error Handling:** จัดการเงื่อนไข Invalid input, Impossible, และกรณีที่เกิดพร้อมกัน 


* 
**Visualization:** แสดงรูปภาพตัวอย่าง (Static Image) ตามผลลัพธ์ 



1.3 Technology Stack (เทคโนโลยีที่ใช้) 

* 
**Frontend:** HTML5, CSS3, JavaScript 


* 
**Framework:** Bootstrap หรือ Tailwind CSS (เพื่อความ Responsive) 


* 
**Development Tool:** VS Code 



---

2. Structural Design (การออกแบบโครงสร้าง) 

ระบบใช้หลักการ **Modularization** แบ่งออกเป็น 4 Modules หลัก: 

1. 
**Main Controller:** ควบคุมการไหลของข้อมูลระหว่าง UI และ Module อื่น 


2. 
**Validator Module:** ตรวจสอบความถูกต้องของข้อมูลและกฎทางคณิตศาสตร์ 


3. 
**Classifier Module:** ประมวลผลประเภทของสามเหลี่ยม 


4. 
**Image Viewer Module:** แสดงรูปภาพกราฟิกตัวอย่าง 



---

3. Detailed Design (รายละเอียดการออกแบบโมดูล) 

3.1 Module: Validator (ตรวจสอบความถูกต้อง) 

| Field | Detail |
| --- | --- |
| **Module Name** | Validator Module 

 |
| **Description** | ตรวจสอบค่า Input และความเป็นไปได้ทางคณิตศาสตร์ 

 |
| **Input Data** | <br>`Sides[3]`: Array ของจำนวนจริง 

 |
| **Output Data** | <br>`IsValid` (Boolean), `ErrorMessage` (String) 

 |
| **Logic Details** | 1. **Check Value:** ตรวจสอบค่า  (Flag: `isInvalid`) 

<br>

<br>2. **Check Triangle Rule:** ผลรวม 2 ด้านต้องมากกว่าด้านที่เหลือ () หากไม่จริง (Flag: `isImpossible`) 

<br>

<br>3. **Priority Logic:** 

<br>

<br>- (isInvalid AND isImpossible)  "Invalid input and Impossible."<br>

<br>- (isInvalid only)  "Invalid input, please insert a number above 0."<br>

<br>- (isImpossible only)  "Impossible."<br>

<br>- อื่นๆ  Valid 

 |

3.2 Module: Classifier (จำแนกประเภท) 

| Field | Detail |
| --- | --- |
| **Module Name** | Classifier Module 

 |
| **Description** | จำแนกประเภทสามเหลี่ยม 3 ประเภทหลัก และมุมฉาก 

 |
| **Input Data** | <br>`Sides[3]`: จำนวนจริงที่ผ่านการตรวจสอบแล้ว 

 |
| **Output Data** | <br>`TriangleType` (Enum), `IsRightTriangle` (Boolean) 

 |
| **Logic Details** | 1. **Equilateral:**  

<br>

<br>2. **Isosceles:** มี 2 ด้านเท่ากัน 

<br>

<br>3. **Scalene:** ไม่มีด้านใดเท่ากันเลย 

<br>

<br>4. **Right Triangle:** ตรวจสอบ  (เมื่อ  ยาวที่สุด) 

 |

3.3 Module: Image Viewer (แสดงผลรูปภาพ) 

| Field | Detail |
| --- | --- |
| **Module Name** | ImageViewer Module 

 |
| **Description** | เลือกไฟล์รูปภาพ (Static Asset) ตามเงื่อนไข 

 |
| **Input Data** | <br>`TriangleType`, `IsRight` 

 |
| **Output Data** | <br>`ImagePath` (String) 

 |

---

4. Pseudo Code 

4.1 Main Controller Logic 

```pseudocode
FUNCTION Main Controller
    // 1. รับค่า
    [cite_start]GET input_S1, input_S2, input_S3 FROM UI [cite: 43]

    // 2. เรียก Validator
    [cite_start]SET validationResult = CALL Validator_Module(input_S1, input_S2, input_S3) [cite: 45]

    // 3. ตรวจสอบสถานะ
    [cite_start]IF validationResult.IsValid IS FALSE THEN [cite: 47]
        [cite_start]DISPLAY validationResult.ErrorMessage [cite: 48]
        [cite_start]RETURN [cite: 49]
    END IF

    // 4. คำนวณประเภท
    [cite_start]SET classificationResult = CALL Classifier_Module(input_S1, input_S2, input_S3) [cite: 52]

    // 5. หารูปภาพ (เช็คมุมฉากก่อนตามลำดับความสำคัญ)
    [cite_start]SET imagePath = CALL ImageViewer_Module(classificationResult.TriangleType, classificationResult.IsRight) [cite: 54]

    // 6. อัปเดตหน้าจอ
    [cite_start]DISPLAY classificationResult.TriangleType [cite: 55]
    [cite_start]IF classificationResult.IsRight IS TRUE THEN [cite: 56]
        [cite_start]APPEND TEXT " (Right Triangle)" [cite: 57]
    END IF
    [cite_start]DISPLAY IMAGE from imagePath [cite: 59]
END FUNCTION

```

4.2 Validator Logic 

```pseudocode
FUNCTION Validator_Module(S1, S2, S3)
    SET isInvalid = FALSE
    SET isImpossible = FALSE

    // Check 1: Values <= 0
    [cite_start]IF (S1 <= 0 OR S2 <= 0 OR S3 <= 0) THEN [cite: 66]
        [cite_start]SET isInvalid = TRUE [cite: 68]
    END IF

    // Check 2: Triangle Inequality
    [cite_start]IF (S1+S2 <= S3) OR (S1+S3 <= S2) OR (S2+S3 <= S1) THEN [cite: 70]
        [cite_start]SET isImpossible = TRUE [cite: 72]
    END IF

    // Priority Logic Return
    IF (isInvalid AND isImpossible) THEN
        RETURN { IsValid: FALSE, ErrorMessage: "Invalid input and Impossible." [cite_start]} [cite: 75]
    ELSE IF (isInvalid) THEN
        RETURN { IsValid: FALSE, ErrorMessage: "Invalid input, please insert a number above 0." [cite_start]} [cite: 77]
    ELSE IF (isImpossible) THEN
        RETURN { IsValid: FALSE, ErrorMessage: "Impossible." [cite_start]} [cite: 79]
    ELSE
        [cite_start]RETURN { IsValid: TRUE, ErrorMessage: "" } [cite: 81]
    END IF
END FUNCTION

```

---

5. Modularization Analysis 

5.1 Module Coupling 

| Connection | Data Passed | Coupling | Reason |
| --- | --- | --- | --- |
| Main  Validator |  | Data Coupling | ส่งค่าตัวเลขดิบเท่านั้น 

 |
| Main  Classifier |  | Data Coupling | ส่งค่าที่ตรวจสอบแล้วไปคำนวณต่อ 

 |
| Main  ImageViewer | `TriangleType`, `IsRight` | Data Coupling | ส่งผลลัพธ์เพื่อเลือกรูป 

 |

**Conclusion:** Pass ทุกโมดูลเป็น **Data Coupling** 

5.2 Module Cohesion 

| Module | Cohesion Level | Responsibility |
| --- | --- | --- |
| Validator | Functional (High) | ตรวจสอบความถูกต้องและแจ้ง Error 

 |
| Classifier | Functional (High) | คำนวณทางคณิตศาสตร์เพื่อระบุประเภท 

 |
| ImageViewer | Functional (High) | เลือกไฟล์รูปภาพตามเงื่อนไข 

 |
| Main Controller | Communicational | ควบคุมลำดับการทำงานและ UI 

 |

---

6. Test Case Mapping 

| Case ID | Input (S1, S2, S3) | Expected Condition | Expected Output |
| --- | --- | --- | --- |
| **TC-01** | 0, 5, 5 | Value  Only | "Invalid input, please insert..." 

 |
| **TC-02** | 2, 3, 10 | Impossible Only | "Impossible." 

 |
| **TC-03** | -1, 2, 10 |  AND Impossible | "Invalid input and Impossible." 

 |
| **TC-04** | 3, 4, 5 | Right Triangle | Right Triangle + Image 

 |
| **TC-05** | 5, 5, 5 | Equilateral | Equilateral + Image 

 |

---

**จัดทำโดย:**

* 67010585 เป็นต่อ เฮงหลี 


* 67010686 ภัคพล เพ็ญสิริภักดิ์ 



---

**มีส่วนไหนของ Pseudo Code ที่คุณอยากให้ปรับแต่งเพิ่มเติมเพื่อให้เข้ากับ Framework ที่ AI Agent จะใช้งานไหมครับ?**