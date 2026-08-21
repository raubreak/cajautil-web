const DAY_MS = 24 * 60 * 60 * 1000;

function createClampedDate(year: number, month: number, day: number): Date {
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(day, lastDayOfMonth));
}

function addMonthsClamped(date: Date, months: number): Date {
  const targetMonth = new Date(date.getFullYear(), date.getMonth() + months, 1);
  return createClampedDate(
    targetMonth.getFullYear(),
    targetMonth.getMonth(),
    date.getDate(),
  );
}

function calendarDayDifference(start: Date, end: Date): number {
  const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((endUtc - startUtc) / DAY_MS);
}

export function calculateCalendarAge(birthDate: Date, today: Date) {
  let years = today.getFullYear() - birthDate.getFullYear();
  let anniversary = createClampedDate(
    birthDate.getFullYear() + years,
    birthDate.getMonth(),
    birthDate.getDate(),
  );

  if (anniversary > today) {
    years -= 1;
    anniversary = createClampedDate(
      birthDate.getFullYear() + years,
      birthDate.getMonth(),
      birthDate.getDate(),
    );
  }

  let months = 0;
  while (months < 11 && addMonthsClamped(anniversary, months + 1) <= today) {
    months += 1;
  }

  const monthAnniversary = addMonthsClamped(anniversary, months);

  return {
    years,
    months,
    days: calendarDayDifference(monthAnniversary, today),
  };
}

export function calculateNextBirthday(birthDate: Date, now: Date) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let nextBirthday = createClampedDate(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate(),
  );
  const isToday = nextBirthday.getTime() === today.getTime();

  if (!isToday && nextBirthday <= now) {
    nextBirthday = createClampedDate(
      now.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate(),
    );
  }

  const difference = isToday ? 0 : Math.max(0, nextBirthday.getTime() - now.getTime());

  return {
    isToday,
    date: nextBirthday,
    days: Math.floor(difference / DAY_MS),
    hours: Math.floor((difference % DAY_MS) / (60 * 60 * 1000)),
    minutes: Math.floor((difference % (60 * 60 * 1000)) / (60 * 1000)),
    seconds: Math.floor((difference % (60 * 1000)) / 1000),
  };
}
