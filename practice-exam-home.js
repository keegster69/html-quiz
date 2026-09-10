// Used inside the standalone notebook bundle by build-practice-exam.cjs.
function PracticeHome({start,progress}) {
  const el = X.createElement;
  const unscored = practiceQuestions.filter(q=>!q.correct);
  const count = practiceQuestions.length-unscored.length;
  const card = {background:'#fff',border:'1px solid #e4e7e2',borderRadius:10,padding:'22px',marginBottom:18};
  const muted = {fontFamily:'system-ui, sans-serif',fontSize:14,lineHeight:1.7,color:'#5d666e'};
  return el('main',{style:{maxWidth:780,margin:'0 auto',padding:'32px 18px 48px'}},
    el('div',{style:{...muted,color:'#527465',fontWeight:600}},'BIOLOGY · PRACTICE EXAM'),
    el('h1',{style:{fontSize:'clamp(27px, 5vw, 36px)',fontWeight:400,margin:'10px 0'}},'BIOL 130 Practice Exam'),
    el('p',{style:muted},'Questions from Practice-exam.txt, with the original question numbers preserved. Use the familiar one-question-at-a-time exam, immediate feedback, results, and retakes.'),
    missingQuestionNumbers.length > 0 && el('aside',{style:{...card,background:'#fffbeb',borderColor:'#e9d59a'},'aria-label':'Source completeness'},
      el('strong',{style:{...muted,color:'#704e13'}},`${sourceQuestionCount} of 115 source questions supplied`),
      el('p',{style:{...muted,marginBottom:0}},`The text ends at question 115 but skips ${missingQuestionNumbers.length} questions. Missing numbers: ${missingQuestionNumbers.join(', ')}. They will need to be added to the source before the full exam can be included.`)
    ),
    el('p',{style:muted},`${sourceQuestionCount} source questions imported. ${omittedImageQuestions.length} questions requiring missing images have been removed, leaving ${practiceQuestions.length} questions on this page.`),
    el('section',{style:card,'aria-label':'Start practice exam'},
      el('h2',{style:{fontSize:23,fontWeight:400,margin:'0 0 12px'}},`${count} scored questions`),
      el('p',{style:muted},`All ${count} answerable questions appear on every attempt. Questions and answer choices shuffle each time; original answer letters stay visible for choices such as “both b and d.”${unscored.length ? ` Another ${unscored.length} source questions are available below for unscored review.` : ''}`),
      el('p',{style:muted},'No official answer key was included. Feedback uses inferred biology answers, with qualifications where the wording is simplified. Scores are saved separately from your biology review progress.'),
      progress && el('p',{style:muted},`Last score: ${progress.lastPct}% · Best: ${progress.bestPct}% · Attempts: ${progress.attempts}`),
      el('button',{onClick:start,style:{fontFamily:'system-ui, sans-serif',fontSize:15,fontWeight:600,color:'#fff',background:'#254f40',border:0,borderRadius:8,padding:'15px 24px',minHeight:48,cursor:'pointer'}},progress?'Retake practice exam':'Start practice exam')
    ),
    unscored.length > 0 && el('section',{'aria-labelledby':'unscored-heading'},
      el('h2',{id:'unscored-heading',style:{fontSize:23,fontWeight:400}},'Unscored source questions'),
      el('p',{style:muted},'These text-only questions have ambiguous wording or answer choices. They are available for review but do not affect your score.'),
      ...unscored.map(q=>el('details',{key:q.number,style:{...card,padding:'16px 18px'}},
        el('summary',{style:{cursor:'pointer',fontSize:16,lineHeight:1.6}},`Question ${q.number} · Ambiguous answer`),
        el('p',{style:{fontSize:17,lineHeight:1.6}},q.prompt),
        el('ul',{style:{...muted,listStyle:'none',paddingLeft:0}},...q.options.map(o=>el('li',{key:o.id,style:{marginBottom:7}},o.text))),
        el('p',{style:{...muted,color:'#875c16'}},q.note)
      ))
    ),
    el('p',{style:{...muted,fontSize:12}},'Answer notes: ',
      el('a',{href:'https://www.nobelprize.org/uploads/2023/12/TeacherEdition_Unit1_Scientific_thinking_for_all_231206.pdf',target:'_blank',rel:'noopener noreferrer'},'Microscope history'),
      ' · ',el('a',{href:'https://www.ncbi.nlm.nih.gov/books/NBK26871/',target:'_blank',rel:'noopener noreferrer'},'Membrane asymmetry'),
      ' · ',el('a',{href:'https://pubmed.ncbi.nlm.nih.gov/29896788/',target:'_blank',rel:'noopener noreferrer'},'Cholesterol distribution'))
  );
}
