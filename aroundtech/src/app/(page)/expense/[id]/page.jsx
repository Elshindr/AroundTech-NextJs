'use client'

import SaisieExpense from '@/components/expenses/expenseSaisieComponent';

export default function SaisieExpensePage({ params, searchparams }) {

    return (
        <div>
            <SaisieExpense idMission={params.id} searchParams={searchparams} />
        </div>
    );
}